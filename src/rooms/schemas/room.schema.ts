/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    _id: ObjectId;

    @Prop({ unique: true })
    name: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
