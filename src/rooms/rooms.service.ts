/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { RoomInterface } from "./interfaces/room.interface";
import { Room, RoomDocument } from "./schemas/room.schema";
import { MetricInterface } from "./interfaces/metric.interface";
import { Metric, MetricDocument } from "./schemas/metric.schema";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        @InjectModel(Metric.name) private metricModel: Model<MetricDocument>
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
     * Return temperatures and humidities related to the room dependind on the from and to parameters
     * @param room_id
     * @param from 
     * @param to 
     * @returns 
     */
     async findMetrics(room: Room, from: string, to: string): Promise<Metric[]> {
        return await this.metricModel.find({ room_id: room._id, date: { $gte: from, $lte: to } }).sort('date');
    }

    /**
     * Create temperature and humidity related to a room
     * @param metric
     */
    createMetrics(metric: MetricInterface): void {
        this.metricModel.create(metric);
    }
}
