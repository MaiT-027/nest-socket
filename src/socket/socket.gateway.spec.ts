import { Test, TestingModule } from '@nestjs/testing';
import { SocketGateway } from './socket.gateway';
import * as io from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { SocketService } from './socket.service';

describe('SocketGateway', () => {
  let app: INestApplication;
  let socket: io.Socket;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway, SocketService],
    }).compile();

    app = module.createNestApplication();
    await app.listen(3000);

    socket = io.connect('http://localhost:3000');
  });

  afterEach(() => {
    socket.disconnect();
    app.close();
  });

  it('should connect to server', () => {
    expect(socket).toBeDefined();
  });

  it('console.log output will be specific string', async () => {
    const messagePromise = new Promise<string>((resolve) => {
      socket.emit('message', 'test', (payload: string) => {
        resolve(payload);
      });
    });
    const payload = await messagePromise;
    expect(payload).toEqual('test');
  });
});
