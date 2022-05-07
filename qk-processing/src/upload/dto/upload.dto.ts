import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data Transfer Object of the Mass-Upload Request,
 * it validates incoming data and helps to move data safely within processing component
 */
export class UploadDto {
    @IsString()
    @IsNotEmpty()
      mapping: string;
}