/// <reference types="node" />
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import Stripe from "stripe";
import { CredentialsRepository } from "../credentials/repository/credentials.repository";
import { PrismaService } from "../prisma/prisma.service";
import { SettingsService } from "../settings/settings.service";
import { PaymentCheckoutDto } from "./dto";
export declare class PaymentService {
    private readonly stripe;
    private readonly config;
    private readonly settings;
    private readonly credentialsRepository;
    private readonly prisma;
    constructor(stripe: Stripe, config: ConfigService, settings: SettingsService, credentialsRepository: CredentialsRepository, prisma: PrismaService);
    createCheckoutSession(user: User, dto: PaymentCheckoutDto): Promise<string>;
    constructEventFromPayload(signature: string, payload: Buffer): Stripe.Event;
    private checkCredentials;
}
