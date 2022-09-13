import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Room } from './room.schema';

export type MetricDocument = Metric & Document;

@Schema()
export class Metric {
    _id: mongoose.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
    room_id: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Number, required: true })
    t: number;

    @Prop({ type: Number, required: true })
    h: number;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
