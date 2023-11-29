import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  constructor(private readonly socketService: SocketService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(_socket: Socket, payload: string): string {
    return this.socketService.handleMessage(payload);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.socketService.handleConnection(socket);
  }
}
