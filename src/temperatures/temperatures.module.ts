import { Module } from '@nestjs/common';
import { TemperatureController } from './temperatures.controller';
import { TemperaturesService } from './temperatures.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Temperature, TemperatureSchema } from './schemas/temperatures.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Temperature.name, schema: TemperatureSchema }]),
  ],
  controllers: [TemperatureController],
  providers: [TemperaturesService],
})
export class TemperatureModule { }
