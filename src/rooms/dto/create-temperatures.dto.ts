import { IsISO8601, IsNumber } from "class-validator";

class Temperature {
    @IsISO8601()
    date: Date;

    @IsNumber()
    value: number;
}

export class CreateTemperaturesDto {
    temperatures: Temperature[];
}

