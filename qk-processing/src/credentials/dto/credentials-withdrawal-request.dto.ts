import { IsNotEmpty, IsString } from "class-validator";

export class CredentialsWithdrawalRequestDto {
    @IsString()
    @IsNotEmpty()
      uuid: string;
}