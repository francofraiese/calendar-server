import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
