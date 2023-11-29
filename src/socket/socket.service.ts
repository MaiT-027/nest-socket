import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  handleMessage(payload: string): string {
    return payload;
  }

  handleConnection(socket: Socket) {
    console.log(socket.rooms);
  }
}
