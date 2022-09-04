/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Temperature } from './temperatures.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    _id: ObjectId;

    @Prop({ default: Date.now })
    createdAt!: Date;

    @Prop()
    name: string;

    temperatures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Temperature' }]
}

export const RoomSchema = SchemaFactory.createForClass(Room);
