import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Room } from './room.schema';

export type HumidityDocument = Humidity & Document;

@Schema()
export class Humidity {
    _id: mongoose.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
    room_id: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Number, required: true })
    value: number;
}

export const HumiditySchema = SchemaFactory.createForClass(Humidity);
