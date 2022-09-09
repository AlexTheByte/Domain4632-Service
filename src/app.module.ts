/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://domain4632-db/domain4632'),
    // MongooseModule.forRoot('mongodb://localhost/domain4632'),
    RoomsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
