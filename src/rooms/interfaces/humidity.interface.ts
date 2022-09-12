import { ObjectId } from "mongoose";

export interface HumidityInterface {
    room_id?: ObjectId;
    date: Date;
    value: number;
}
