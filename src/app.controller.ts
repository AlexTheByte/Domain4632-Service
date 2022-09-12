import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    console.log('Test');
    return this.appService.getHello();
  }

  @Post()
  test(@Body() req, @Res() res: Response) {
    console.log(req);
    res.status(HttpStatus.CREATED).json({t:req});
  }
}
