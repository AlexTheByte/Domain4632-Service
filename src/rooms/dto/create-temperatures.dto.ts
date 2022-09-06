import { IsISO8601, IsNumber } from "class-validator";
import { Room } from "./create-room.dto";

class Temperature {
    @IsISO8601()
    date: Date;

    @IsNumber()
    value: number;
}

export class CreateTemperaturesDto {
    temperatures: Temperature[];
}

