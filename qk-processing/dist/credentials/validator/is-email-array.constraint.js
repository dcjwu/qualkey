"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailArray = exports.IsEmailArrayConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let IsEmailArrayConstraint = class IsEmailArrayConstraint {
    validate(array) {
        try {
            this.validateEmails(array);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    validateEmails(array) {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        array.forEach((email) => {
            if (!regexp.test(email)) {
                throw new class_validator_1.ValidationError();
            }
        });
    }
};
IsEmailArrayConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsEmailArray", async: false }),
    (0, common_1.Injectable)()
], IsEmailArrayConstraint);
exports.IsEmailArrayConstraint = IsEmailArrayConstraint;
function IsEmailArray(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailArrayConstraint,
        });
    };
}
exports.IsEmailArray = IsEmailArray;
//# sourceMappingURL=is-email-array.constraint.js.map