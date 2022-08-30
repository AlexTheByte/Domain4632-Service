import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTemperaturesDto } from './dto/create-temperatures.dto';
import { TemperaturesService } from './temperatures.service';

@Controller('temperatures')
export class TemperatureController {
    constructor(private readonly temperaturesService: TemperaturesService) { }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const temps = await this.temperaturesService.findAll();
        res.status(HttpStatus.OK).json(temps);
    }

    @Post(':id')
    async create(@Param('id') id: string, @Body() createTemperaturesDto: CreateTemperaturesDto, @Res() res: Response) {
        this.temperaturesService.create(createTemperaturesDto.temperatures);
        res.status(HttpStatus.CREATED).send();
    }

    // @Get()
    // async findAll() {
    //     return this.temperaturesService.findAll();
    // }
}
