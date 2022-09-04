/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Temperature, TemperatureDocument } from "./schemas/temperatures.schema";
import { RoomInterface } from "./interfaces/room.interface";
import { Room, RoomDocument } from "./schemas/room.schema";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        @InjectModel(Temperature.name) private temperatureModel: Model<TemperatureDocument>
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
        const createdRoom = new this.roomModel({ ...room });
        return createdRoom.save();
    }

    /**
     * Return temperature related to the room depengind on the from and to parameters
     * @param room_id
     * @param from 
     * @param to 
     * @returns 
     */
    async findTemperatures(room_id, from: string, to: string) {
        return await this.temperatureModel
            .find({
                room_id: room_id,
                date: {
                    $gte: from,
                    $lte: to
                }
            });
    }

    /**
     * Create temperatures related to a room
     * @param room_id
     * @param temperatures 
     * @returns the temperatures
     */
    async createTemperatures(room_id, temperatures) {
        temperatures.forEach(element => {
            element.room_id = room_id;
        });
        return this.temperatureModel.insertMany(temperatures);
    }
}


