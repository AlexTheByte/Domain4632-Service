import { IsISO8601, IsNumber, IsObject } from "class-validator";

class Metrics {
    @IsNumber()
    t: number;

    @IsNumber()
    h: number;
}

export class CreateMetricDto {
    @IsISO8601()
    date: Date;

    @IsObject()
    data: Metrics;
}

