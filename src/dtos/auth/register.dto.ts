import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "Not enough information" })
  @IsEmail({}, { message: "Not a valid email" })
  email!: string;

  @IsNotEmpty({ message: "Not enough information" })
  @MinLength(8, {
    message:
      "The password must contain at least 8 characters, including 1 uppercase, 1 lowercase and 1 number.",
  })
  @Matches(/(?=.*[a-z])/, {
    message:
      "The password must contain at least 8 characters, including 1 uppercase, 1 lowercase and 1 number.",
  })
  @Matches(/(?=.*[A-Z])/, {
    message:
      "The password must contain at least 8 characters, including 1 uppercase, 1 lowercase and 1 number.",
  })
  @Matches(/(?=.*\d)/, {
    message:
      "The password must contain at least 8 characters, including 1 uppercase, 1 lowercase and 1 number.",
  })
  password!: string;

  @IsNotEmpty({ message: "Not enough information" })
  timezone!: string;
}
