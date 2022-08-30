import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureModule } from './temperatures/temperatures.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/domain4632'),
    TemperatureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
