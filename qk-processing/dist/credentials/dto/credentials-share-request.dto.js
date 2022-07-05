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
exports.CredentialsShareRequestDto = void 0;
const class_validator_1 = require("class-validator");
const is_email_array_constraint_1 = require("../validator/is-email-array.constraint");
class CredentialsShareRequestDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CredentialsShareRequestDto.prototype, "uuids", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, is_email_array_constraint_1.IsEmailArray)({ message: "Values should be valid emails" }),
    __metadata("design:type", Array)
], CredentialsShareRequestDto.prototype, "recipientEmails", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CredentialsShareRequestDto.prototype, "sharedFields", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CredentialsShareRequestDto.prototype, "expiresAt", void 0);
exports.CredentialsShareRequestDto = CredentialsShareRequestDto;
//# sourceMappingURL=credentials-share-request.dto.js.map