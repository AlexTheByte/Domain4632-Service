import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Room } from './room.schema';

export type TemperatureDocument = Temperature & Document;


@Schema({ _id: false })
export class Temperature {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
    room_id: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Number, required: true })
    value: number;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);
