import { IsNotEmpty, IsString } from "class-validator";
import { CreateEventDto } from "./create-event.dto";

export class CreateEventServiceDto extends CreateEventDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;
}
