import { ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class IsEmailArrayConstraint implements ValidatorConstraintInterface {
    validate(array: string[]): boolean;
    private validateEmails;
}
export declare function IsEmailArray(validationOptions?: ValidationOptions): any;
