import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Response } from 'express';
import { CreateMetricDto } from './dto/create-metric.dto';
import { RoomPipe } from './rooms.pipe';
import { Room } from './schemas/room.schema';

@Controller('/rooms')
export class RoomController {
    constructor(private readonly roomsService: RoomsService) { }

    // ROOMS
    @Get('me')
    async findMe(@Query() query: { name: string }, @Res() res: Response) {
        const room = await this.roomsService.findMe(query.name);
        res.status(room ? HttpStatus.OK : HttpStatus.NOT_FOUND).json(room);
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
        const room = await this.roomsService.create(createRoomDto);
        console.log(createRoomDto);
        res.status(HttpStatus.CREATED).json(room);
    }

    // TEMPERATURES & HUMIDITIES
    @Get(':_id/metrics')
    async findHumidities(@Param('_id', RoomPipe) room: Room, @Query() query: { from: string, to: string }, @Res() res: Response) {
        // Get params
        const from = new Date(query.from).toISOString();
        const to = new Date(query.to).toISOString();

        // Get humidities
        const metrics = await this.roomsService.findMetrics(room, from, to);
        res.status(HttpStatus.OK).json({room, metrics});
    }

    @Post(':_id/metrics')
    async createMetrics(@Param('_id', RoomPipe) room: Room, @Body() createMetricsDto: CreateMetricDto, @Res() res: Response) {
        const metrics = {room_id: room._id, date: createMetricsDto.date, t: createMetricsDto.data.t, h: createMetricsDto.data.h};
        this.roomsService.createMetrics(metrics);
        
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