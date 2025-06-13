import { IsNotEmpty, IsString } from "class-validator";
import { UpdateEventDto } from "./update-event.dto";

export class UpdateEventServiceDto extends UpdateEventDto {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
