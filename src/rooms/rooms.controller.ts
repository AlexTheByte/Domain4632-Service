/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Response } from 'express';
import { CreateTemperaturesDto } from './dto/create-temperatures.dto';

@Controller('api/rooms')
export class RoomController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get('/me')
    async findMe(@Query() query: { name: string }, @Res() res: Response) {
        const room = await this.roomsService.findMe(query.name);
        res.status(HttpStatus.OK).json(room);
    }

    @Get(':_id')
    async findOne(@Param('_id') _id: string, @Res() res: Response) {
        const room = await this.roomsService.findOne(_id);
        res.status(HttpStatus.OK).json(room);
    }

    @Get()
    async findAll(@Res() res: Response) {
        const rooms = await this.roomsService.findAll();
        res.status(HttpStatus.OK).json(rooms);
    }

    @Post()
    async create(@Body() createRoomDto: CreateRoomDto, @Res() res: Response) {
        const room = await this.roomsService.create(createRoomDto.room);
        res.status(HttpStatus.CREATED).json(room);
    }

    @Get(':_id/temperatures')
    async findTemperatures(@Param('_id') _id: string, @Res() res: Response) {
        const from = new Date("2022-09-04T19:42:26.595+00:00").toISOString();
        const to = new Date("2022-09-08T19:42:26.595+00:00").toISOString()
        const room = await this.roomsService.findOne(_id);
        const temperatures = await this.roomsService.findTemperatures(room._id, from, to);
        res.status(HttpStatus.CREATED).json(temperatures);
    }

    @Post(':_id/temperatures')
    async createTemperatures(@Param('_id') _id: string, @Body() createTemperatesDto: CreateTemperaturesDto, @Res() res: Response) {
        const room = await this.roomsService.findOne(_id);
        this.roomsService.createTemperatures(room._id, createTemperatesDto.temperatures);
        res.status(HttpStatus.CREATED).send();
    }
}




// @Get(':id')
// async findOne(@Query() query: { id: string }, @Res() res: Response) {
//     if (query.id) {
//         const room = await this.roomsService.findOne(query.id);
//         res.status(HttpStatus.OK).json(room);
//         return;
//     }

//     const rooms = await this.roomsService.findAll();
//     res.status(HttpStatus.OK).json(rooms);
// }