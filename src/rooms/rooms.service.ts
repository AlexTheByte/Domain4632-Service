/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { TemperatureDocument } from "./schemas/temperatures.schema";
import { RoomInterface } from "./interfaces/room.interface";
import { Room, RoomDocument } from "./schemas/room.schema";
import { Temperature } from "./schemas/temperatures.schema";
import { TemperatureInterface } from "./interfaces/temperature.interface";
import { MetricsInterface } from "./interfaces/metrics.interface";
import { Humidity, HumidityDocument } from "./schemas/humidity.schema";
import { HumidityInterface } from "./interfaces/humidity.interface";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        @InjectModel(Temperature.name) private temperatureModel: Model<TemperatureDocument>,
        @InjectModel(Humidity.name) private humidityModel: Model<HumidityDocument>
    ) { }

    /**
     * Find room depending on its id
     * @param _id 
     * @returns the room
     */
    async findOne(_id: string): Promise<Room> {
        return this.roomModel.findOne({ _id }).exec();
    }

    /**
     * Find a room depending on its name
     * @param name 
     * @returns the room
     */
    async findMe(name: string): Promise<Room> {
        return this.roomModel.findOne({ name }).exec();
    }

    /**
     * Find all the rooms
     * @returns all rooms
     */
    async findAll(): Promise<Room[]> {
        return this.roomModel.find().exec();
    }

    /**
     * Create a room
     * @param room 
     * @returns the room created
     */
    async create(room: RoomInterface): Promise<Room> {
        return new this.roomModel({ ...room }).save();
    }

    /**
     * Return temperature related to the room dependind on the from and to parameters
     * @param room_id
     * @param from 
     * @param to 
     * @returns 
     */
    async findTemperatures(room: Room, from: string, to: string): Promise<Temperature[]> {
        return await this.temperatureModel.find({ room_id: room._id, date: { $gte: from, $lte: to } });
    }

    /**
     * Return humidity related to the room dependind on the from and to parameters
     * @param room_id
     * @param from 
     * @param to 
     * @returns 
     */
     async findHumidities(room: Room, from: string, to: string): Promise<Humidity[]> {
        return await this.humidityModel.find({ room_id: room._id, date: { $gte: from, $lte: to } });
    }

    /**
     * Create temperatures related to a room
     * @param room_id
     * @param temperatures 
     * @returns the temperatures
     */
    // createTemperatures(room: Room, temperatures: TemperatureInterface[]): void {
    //     temperatures.forEach((temperature: TemperatureInterface) => temperature.room_id = room._id);
        
    //     this.temperatureModel.insertMany(temperatures);
    // }

    /**
     * Create temperature and humidity related to a room
     * @param room 
     * @param metrics 
     */
    createMetrics(room: Room, temperature: TemperatureInterface, humidity: HumidityInterface): void {
        this.temperatureModel.create(temperature);
        this.humidityModel.create(humidity);
    }
}
