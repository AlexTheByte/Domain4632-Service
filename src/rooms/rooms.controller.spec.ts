import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomPipe } from './rooms.pipe';
import { CreateRoomDto } from './dto/create-room.dto';
import { Response } from 'express';
import { Room } from './schemas/room.schema';
import { CreateMetricDto } from './dto/create-metric.dto';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomsService: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomsService],
    }).compile();

    roomController = module.get<RoomController>(RoomController);
    roomsService = module.get<RoomsService>(RoomsService);
  });

  describe('findMe', () => {
    it('should return a room if found', async () => {
      const mockRoom: Room = { _id: '1', name: 'Test Room', createdAt: new Date() };
      jest.spyOn(roomsService, 'findMe').mockResolvedValue(mockRoom);

      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await roomController.findMe({ name: 'Test Room' }, mockRes);

      expect(roomsService.findMe).toHaveBeenCalledWith('Test Room');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 404 if room not found', async () => {
      jest.spyOn(roomsService, 'findMe').mockResolvedValue(null);

      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await roomController.findMe({ name: 'Unknown Room' }, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('create', () => {
    it('should create a new room if not exists', async () => {
      const mockRoom: Room = { _id: '1', name: 'New Room', createdAt: new Date() };
      const createRoomDto: CreateRoomDto = { name: 'New Room' };

      jest.spyOn(roomsService, 'findMe').mockResolvedValue(null);
      jest.spyOn(roomsService, 'create').mockResolvedValue(mockRoom);

      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await roomController.create(createRoomDto, mockRes);

      expect(roomsService.findMe).toHaveBeenCalledWith('New Room');
      expect(roomsService.create).toHaveBeenCalledWith(createRoomDto);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 403 if room already exists', async () => {
      const mockRoom: Room = { _id: '1', name: 'Existing Room', createdAt: new Date() };
      const createRoomDto: CreateRoomDto = { name: 'Existing Room' };

      jest.spyOn(roomsService, 'findMe').mockResolvedValue(mockRoom);

      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

      await roomController.create(createRoomDto, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });

  describe('createMetrics', () => {
    it('should create metrics for the room', async () => {
      const mockRoom: Room = { _id: '1', name: 'Room 1', createdAt: new Date() };
      const mockMetrics: CreateMetricDto[] = [
        { date: new Date(), data: { t: 22, h: 55 } }
      ];

      jest.spyOn(roomsService, 'createMetrics').mockResolvedValue([]);

      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

      await roomController.createMetrics(mockRoom, mockMetrics, mockRes);

      expect(roomsService.createMetrics).toHaveBeenCalledWith([
        { room_id: mockRoom._id, date: mockMetrics[0].date, t: 22, h: 55 }
      ]);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });
});
