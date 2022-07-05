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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const assert = require("assert");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const aws_ses_service_1 = require("../aws/aws.ses.service");
const prisma_service_1 = require("../prisma/prisma.service");
const password_generator_service_1 = require("./helper/password-generator.service");
let UserFactory = class UserFactory {
    constructor(prisma, passwordGenerator, ses) {
        this.prisma = prisma;
        this.passwordGenerator = passwordGenerator;
        this.ses = ses;
    }
    async createStudent(email, fullname) {
        assert(email !== "", "email must not be empty");
        assert(fullname !== "", "Full name must not be empty");
        const password = password_generator_service_1.PasswordGenerator.generate(8, true, false);
        await this.ses.sendWelcomeUserEmail(email, fullname, password).catch(err => {
            common_1.Logger.error(err, err.stack);
        });
        return await this.prisma.user.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                role: client_1.Role.STUDENT,
            },
        });
    }
};
UserFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_generator_service_1.PasswordGenerator,
        aws_ses_service_1.AwsSesService])
], UserFactory);
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.factory.js.map