import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemperatureDocument = Temperature & Document;

@Schema()
export class Temperature {
    @Prop()
    date: string;

    @Prop()
    value: number;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);
