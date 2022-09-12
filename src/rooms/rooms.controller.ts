import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Response } from 'express';
import { CreateTemperaturesDto } from './dto/create-temperatures.dto';
import { RoomPipe } from './rooms.pipe';
import { Room } from './schemas/room.schema';
import { CreateMetricsDto } from './dto/create-metrics.dto';

@Controller('/rooms')
export class RoomController {
    constructor(private readonly roomsService: RoomsService) { }

    // ROOMS
    @Get('me')
    async findMe(@Query() query: { name: string }, @Res() res: Response) {
        const room = await this.roomsService.findMe(query.name);
        res.status(HttpStatus.OK).json(room);
    }

    @Get(':_id')
    async findOne(@Param('_id', RoomPipe) room: Room, @Res() res: Response) {
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

    // TEMPERATURES
    // @Post(':_id/temperatures')
    // async createTemperatures(@Param('_id', RoomPipe) room: Room, @Body() createTemperatesDto: CreateTemperaturesDto, @Res() res: Response) {
    //     this.roomsService.createTemperatures(room, createTemperatesDto.temperatures);
    //     res.status(HttpStatus.CREATED).send();
    // }

    @Get(':_id/temperatures')
    async findTemperatures(@Param('_id', RoomPipe) room: Room, @Query() query: { from: string, to: string }, @Res() res: Response) {
        // Get params
        const from = new Date(query.from).toISOString();
        const to = new Date(query.to).toISOString();

        // Get temperatures
        const temperatures = await this.roomsService.findTemperatures(room, from, to);
        res.status(HttpStatus.OK).json({room, temperatures});
    }

    // HUMIDITIES
    @Get(':_id/humidities')
    async findHumidities(@Param('_id', RoomPipe) room: Room, @Query() query: { from: string, to: string }, @Res() res: Response) {
        // Get params
        const from = new Date(query.from).toISOString();
        const to = new Date(query.to).toISOString();

        // Get humidities
        const humidities = await this.roomsService.findHumidities(room, from, to);
        res.status(HttpStatus.OK).json({room, humidities});
    }

    // TEMPERATURES & HUMIDITIES
    @Post(':_id/metrics')
    async createMetrics(@Param('_id', RoomPipe) room: Room, @Body() createMetricsDto: CreateMetricsDto, @Res() res: Response) {
        const temperature = {room_id: room._id, date: createMetricsDto.date, value: createMetricsDto.data.t};
        const humidity = {room_id: room._id, date: createMetricsDto.date, value: createMetricsDto.data.h};

        this.roomsService.createMetrics(room, temperature, humidity);
        
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