import { Injectable } from "@nestjs/common";
// import { Temperature } from "src/temperatures/interfaces/temperatures.interface";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
// import { Temperature, TemperatureDocument } from "./schemas/temperatures.schema";

@Injectable()
export class TemperaturesService {
    // constructor(@InjectModel(Temperature.name) private temperatureModel: Model<TemperatureDocument>) { }

    // async findAll() {
    //     console.log(this.temperatureModel.find().exec());
    //     return this.temperatureModel.find().exec();
    // }

    // async create(temperature) {
    //     return this.temperatureModel.insertMany(temperature);
    // }
}
