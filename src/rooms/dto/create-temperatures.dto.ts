import { Room } from "./create-room.dto";

class Temperature {
    date: string;
    value: number;
}

export class CreateTemperaturesDto {
    temperatures: Temperature[];
}
