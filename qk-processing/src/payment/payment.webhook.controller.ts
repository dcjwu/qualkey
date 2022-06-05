import { Controller, Post, Headers, Req, BadRequestException } from "@nestjs/common";

import RequestWithRawBody from "./dto/request.raw-body";
import { PaymentService } from "./payment.service";

@Controller("payment/webhook")
export class PaymentWebhookController {
  constructor(
        private paymentService: PaymentService,
  ) {
  }

    /**
     * Handle successful callback for checkout
     */
    @Post()
  handleIncomingWebhooks(
        @Headers("stripe-signature") signature: string,
        @Req() request: RequestWithRawBody,
  ): void {
    if (!signature) {
      throw new BadRequestException("Missing stripe-signature header");
    }

    const event = this.paymentService.constructEventFromPayload(signature, request.rawBody);

    console.log(event);
  }
}
