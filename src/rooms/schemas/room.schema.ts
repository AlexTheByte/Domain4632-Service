/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    _id: ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
