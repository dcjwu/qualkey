"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordGenerator = void 0;
const common_1 = require("@nestjs/common");
let PasswordGenerator = class PasswordGenerator {
    static generate(length, hasNumbers, hasSymbols) {
        const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const integers = "0123456789";
        const exCharacters = "!@#$%^&*_-=+";
        let chars = alpha;
        if (hasNumbers) {
            chars += integers;
        }
        if (hasSymbols) {
            chars += exCharacters;
        }
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
};
PasswordGenerator = __decorate([
    (0, common_1.Injectable)()
], PasswordGenerator);
exports.PasswordGenerator = PasswordGenerator;
//# sourceMappingURL=password-generator.service.js.map