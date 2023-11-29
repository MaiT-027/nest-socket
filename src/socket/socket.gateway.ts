import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit() {}

  @SubscribeMessage('message')
  handleMessage(payload: string): void {
    this.server.emit('message', payload);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(socket.rooms);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} bye`);
  }
}
