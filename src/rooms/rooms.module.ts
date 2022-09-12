import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.schema';
import { Temperature, TemperatureSchema } from './schemas/temperatures.schema';
import { Humidity, HumiditySchema } from './schemas/humidity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Temperature.name, schema: TemperatureSchema }]),
    MongooseModule.forFeature([{ name: Humidity.name, schema: HumiditySchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomsService],
})
export class RoomsModule { }
