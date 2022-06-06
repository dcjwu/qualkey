import { IsArray, IsDateString, IsNotEmpty } from "class-validator";

import { IsEmailArray } from "../validator/is-email-array.constraint";

/**
 * Data Transfer Object with CredentialsShare data
 */
export class CredentialsShareRequestDto {
    @IsArray()
    @IsNotEmpty()
      uuids: string[];

    @IsArray()
    @IsEmailArray({ message: "Values should be valid emails" })
      recipientEmails: string[]; // array with recipient emails

    @IsArray()
    @IsNotEmpty()
      sharedFields: string[]; // array with string field names allowed for sharing  full_name;majors;qualification_level

    @IsDateString()
    @IsNotEmpty()
      expiresAt: string;
}