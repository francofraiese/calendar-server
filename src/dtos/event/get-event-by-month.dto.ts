import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class GetEventsByMonthDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1970)
  year!: number;

  @IsNotEmpty()
  @IsString()
  userId!: string;
}
