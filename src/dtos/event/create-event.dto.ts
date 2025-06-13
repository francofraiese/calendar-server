import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  eventDate!: Date;

  @IsNotEmpty()
  @IsDate()
  endDate!: Date;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
