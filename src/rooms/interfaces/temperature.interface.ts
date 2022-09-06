import { ObjectId } from "mongoose";

export interface TemperatureInterface {
    room_id?: ObjectId;
    date: Date;
    value: number;
}
