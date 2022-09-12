import { ObjectId } from "mongoose";

export interface MetricsInterface {
    room_id?: ObjectId;
    date: Date;
    data: { t: number, h: number };
}
