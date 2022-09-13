import { ObjectId } from "mongoose";

export interface MetricInterface {
    room_id?: ObjectId;
    date: Date;
    t: number;
    h: number;
}
