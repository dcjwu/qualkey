import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Data Transfer Object of the Authentication Request,
 * it validates incoming data and helps to move data safely within processing component
 */
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
      email: string;

    @IsString()
    @IsNotEmpty()
      password: string;
    
    @IsBoolean()
    @Transform(({ value } ) => value === "true")
      rememberMe: boolean;
}