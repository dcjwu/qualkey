"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const nestjs_stripe_1 = require("nestjs-stripe");
const stripe_1 = require("stripe");
const uuid_1 = require("uuid");
const exception_1 = require("../common/exception");
const credentials_repository_1 = require("../credentials/repository/credentials.repository");
const prisma_service_1 = require("../prisma/prisma.service");
const settings_service_1 = require("../settings/settings.service");
let PaymentService = class PaymentService {
    constructor(stripe, config, settings, credentialsRepository, prisma) {
        this.stripe = stripe;
        this.config = config;
        this.settings = settings;
        this.credentialsRepository = credentialsRepository;
        this.prisma = prisma;
    }
    async createCheckoutSession(user, dto) {
        const credentials = await this.checkCredentials(user, dto.credentialUuids);
        const uuid = (0, uuid_1.v4)();
        common_1.Logger.log(`Creating stripe checkout session for student ${user.uuid}`);
        const customerExists = user.stripeCustomerId !== null;
        const session = await this.stripe.checkout.sessions.create({
            customer_email: customerExists ? undefined : user.email,
            client_reference_id: uuid,
            customer: customerExists ? user.stripeCustomerId : undefined,
            line_items: [{
                    price: await this.settings.get("credentials.price." + user.currency.toLowerCase()),
                    quantity: credentials.length,
                }],
            payment_method_types: ["card"],
            mode: "payment",
            success_url: this.config.get("FRONT_HOST") + "/payment/success",
            cancel_url: this.config.get("FRONT_HOST") + "/payment/cancel",
        });
        common_1.Logger.log(`Checkout session created: ${session.id}`);
        await this.prisma.payment.create({
            data: {
                uuid: uuid,
                externalId: session.id,
                studentUuid: user.uuid,
                amount: session.amount_total,
                currency: user.currency,
                method: session.payment_method_types[0],
                credentialUuids: dto.credentialUuids,
            },
        });
        return session.url;
    }
    constructEventFromPayload(signature, payload) {
        const webhookSecret = this.config.get("STRIPE_WEBHOOK_SECRET");
        return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
    async checkCredentials(user, credentialUuids) {
        const credentials = [];
        for (const uuid of credentialUuids) {
            const credential = await this.prisma.credential.findUnique({ where: { uuid: uuid } });
            if (null === credential)
                throw new exception_1.CredentialsNotFoundException(uuid);
            if (user.uuid !== credential.studentUuid) {
                throw new common_1.ForbiddenException("You can activate only your own credentials");
            }
            if (credential.status !== client_1.CredentialStatus.UPLOADED_TO_BLOCKCHAIN) {
                throw new common_1.ForbiddenException("It is possible to activate only those credentials, which were uploaded to Hedera");
            }
            credentials.push(credential);
        }
        return credentials;
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_stripe_1.InjectStripe)()),
    __metadata("design:paramtypes", [stripe_1.default,
        config_1.ConfigService,
        settings_service_1.SettingsService,
        credentials_repository_1.CredentialsRepository,
        prisma_service_1.PrismaService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map