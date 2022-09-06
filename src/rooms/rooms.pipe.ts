
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomPipe implements PipeTransform {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async transform(value: string, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException('This is not an id');
        }

        const room = await this.roomModel.findById(value).exec();

        if (!room) {
            throw new NotFoundException('Room not found');
        }
        return room;
    }
}
