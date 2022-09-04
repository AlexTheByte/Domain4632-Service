import { RoomInterface } from "./room.interface";

export interface TemperatureInterface {
    room: RoomInterface;
    date: Date;
    value: number;
}
