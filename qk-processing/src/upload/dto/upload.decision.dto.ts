import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

/**
 * Data Transfer Object of the Decision made about Mass-upload, APPROVE or REJECT
 */
export class UploadDecisionDto {
    @IsString()
    @IsNotEmpty()
      uuid: string;

    @IsNumberString()
    @IsNotEmpty()
      actionId: number;
}