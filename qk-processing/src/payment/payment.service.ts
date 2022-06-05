import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User, Credential, PaymentStatus } from "@prisma/client";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

import { CredentialsNotFoundException } from "../common/exception";
import { CredentialsRepository } from "../credentials/repository/credentials.repository";
import { PrismaService } from "../prisma/prisma.service";
import { SettingsService } from "../settings/settings.service";
import { PaymentCheckoutDto } from "./dto";

@Injectable()
export class PaymentService {
  public constructor(
        @InjectStripe() private readonly stripe: Stripe,
        private readonly config: ConfigService,
        private readonly settings: SettingsService,
        private readonly credentialsRepository: CredentialsRepository,
        private readonly prisma: PrismaService,
  ) {}

  public async createCheckoutSession(user: User, dto: PaymentCheckoutDto): Promise<string> {
    //  Check credentials and that they belong to the correct user
    const credentials = await this.checkCredentials(user, dto.credentialUuids);

    Logger.log(`Creating stripe checkout session for student ${user.uuid}`);
    // Create stripe checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.stripeCustomerId === null ? undefined : user.stripeCustomerId,
      line_items: [{
        price: await this.settings.get("credentials.price." + user.currency.toLowerCase()),
        quantity: credentials.length,
      }],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: this.config.get("FRONT_HOST") + "/payment/success.html",
      cancel_url: this.config.get("FRONT_HOST") + "/payment/cancel.html",
    });
    // TODO: Update User with Stripe client reference ID
    Logger.log(`Checkout session created: ${session.id}`);
    // Create Payment and save it to DB
    await this.prisma.payment.create({
      data: {
        externalId: session.id,
        studentUuid: user.uuid,
        status: PaymentStatus.PENDING,
        amount: session.amount_total,
        currency: user.currency,
        method: session.payment_method_types[0],
        credentialUuids: dto.credentialUuids,
      },
    });

    return session.url;
  }

  public constructEventFromPayload(signature: string, payload: Buffer): Stripe.Event {
    const webhookSecret = this.config.get("STRIPE_WEBHOOK_SECRET");

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  private async checkCredentials(user: User, credentialUuids: string[]): Promise<Credential[]> {
    const credentials: Credential[] = [];
    for (const uuid of credentialUuids) {
      const credential = await this.prisma.credential.findUnique({ where: { uuid: uuid } });

      if (null === credential) throw new CredentialsNotFoundException(uuid);
      // Check that credentials belong to the user
      if (user.uuid !== credential.studentUuid) throw new ForbiddenException();

      credentials.push(credential);
    }

    return credentials;
  }
}
