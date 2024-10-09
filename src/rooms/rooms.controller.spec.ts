import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Response } from 'express';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { CreateMetricDto } from './dto/create-metric.dto';
import { Metric } from './schemas/metric.schema';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;
  const mockRoomModel = jest.fn();
  const mockMetricModel = jest.fn();

  // Mock response object
  const mockResponse = () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    return res as Response;
  };

  beforeEach(async () => {
    const mockRoomsService = {
      findMe: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      findMetrics: jest.fn(),
      createMetrics: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          // Provider for the mongoose model
          provide: getModelToken(Room.name),
          useValue: mockRoomModel,
        }, {
            // Provider for the mongoose model
            provide: getModelToken(Metric.name),
            useValue: mockMetricModel,
        }, {
          provide: RoomsService,
          useValue: mockRoomsService,
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMe', () => {
    it('should return room with status 200 when room exists', async () => {
      const mockRoom = { name: 'Test Room' } as Room;
      const query = { name: 'Test Room' };
      const res = mockResponse();
      
      jest.spyOn(service, 'findMe').mockResolvedValue(mockRoom);
      
      await controller.findMe(query, res);
      
      expect(service.findMe).toHaveBeenCalledWith(query.name);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return status 404 when room does not exist', async () => {
      const query = { name: 'Non Existent Room' };
      const res = mockResponse();
      
      jest.spyOn(service, 'findMe').mockResolvedValue(null);
      
      await controller.findMe(query, res);
      
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('findOne', () => {
    it('should return room by id', async () => {
        const mockRoom = { name: 'Test Room' } as Room;
        const res = mockResponse();
      
      await controller.findOne(mockRoom, res);
      
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mockRoom);
    });
  });

  describe('findAll', () => {
    it('should return all rooms', async () => {
      const mockRooms = [{ name: 'Room 1' } as Room, { name: 'Room 2' } as Room];
      const res = mockResponse();
      
      jest.spyOn(service, 'findAll').mockResolvedValue(mockRooms as Room[]);
      
      await controller.findAll(res);
      
      expect(service.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mockRooms);
    });
  });

  describe('create', () => {
    it('should create a room when it does not exist', async () => {
      const createRoomDto: CreateRoomDto = { name: 'New Room' };
      const mockRoom = { ...createRoomDto } as Room;
      const res = mockResponse();
      
      jest.spyOn(service, 'findMe').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(mockRoom);
      
      await controller.create(createRoomDto, res);
      
      expect(service.findMe).toHaveBeenCalledWith(createRoomDto.name);
      expect(service.create).toHaveBeenCalledWith(createRoomDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockRoom);
    });

    it('should return 403 when room already exists', async () => {
      const createRoomDto: CreateRoomDto = { name: 'Existing Room' };
      const existingRoom = { ...createRoomDto } as Room;
      const res = mockResponse();
      
      jest.spyOn(service, 'findMe').mockResolvedValue(existingRoom);
      
      await controller.create(createRoomDto, res);
      
      expect(res.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      expect(service.create).not.toHaveBeenCalled();
    });
  });

  describe('findHumidities', () => {
    it('should return metrics for a room', async () => {
      const mockRoom = { name: 'Test Room' } as Room;
      const query = { from: '2024-01-01', to: '2024-01-02' };
      const mockMetrics = [{ t: 20, h: 50 } as Metric];
      const res = mockResponse();
      
      jest.spyOn(service, 'findMetrics').mockResolvedValue(mockMetrics);
      
      await controller.findHumidities(mockRoom, query, res);
      
      expect(service.findMetrics).toHaveBeenCalledWith(
        mockRoom,
        new Date(query.from).toISOString(),
        new Date(query.to).toISOString()
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ room: mockRoom, metrics: mockMetrics });
    });
  });

  describe('createMetrics', () => {
    it('should create metrics for a room', async () => {
      const mockRoom = { name: 'Test Room' } as Room;
      const createMetricsDto: CreateMetricDto[] = [{
        date: new Date(),
        data: { t: 20, h: 50 }
      }];
      const res = mockResponse();
      
      jest.spyOn(service, 'createMetrics').mockResolvedValue([]);
      
      await controller.createMetrics(mockRoom, createMetricsDto, res);
      
      expect(service.createMetrics).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    });

    it('should return 500 when metrics creation fails', async () => {
      const mockRoom = { name: 'Test Room' } as Room;
      const createMetricsDto: CreateMetricDto[] = [{
        date: new Date(),
        data: { t: 20, h: 50 }
      }];
      const res = mockResponse();
      
      jest.spyOn(service, 'createMetrics').mockResolvedValue(null);
      
      await controller.createMetrics(mockRoom, createMetricsDto, res);
      
      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});