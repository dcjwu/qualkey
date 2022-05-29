import { IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";

import { IsEmailArray } from "../validator/is-email-array.constraint";

/**
 * Data Transfer Object with CredentialsShare data
 */
export class CredentialsShareRequestDto {
    @IsString()
    @IsNotEmpty()
      uuid: string;

    @IsArray()
    @IsEmailArray({ message: "Values should be valid emails" })
      recipientEmails: string[]; // array with recipient emails

    @IsString()
    @IsNotEmpty()
      sharedFields: string; // string with field names allowed for sharing  full_name;majors;qualification_level

    @IsDateString()
    @IsNotEmpty()
      expiresAt: string;
}