import { Server, Socket } from 'socket.io';
import Room from './Room';
const CORS_OPTIONS = {
    origin: "*",
    methods: ["GET", "POST"]
}

export default class ChatApp {
    rooms: Array<Room> = [];

    constructor(io: Server) {
        io.on('connection', (socket: Socket) => {
            console.log("We have a new connection - " + socket.id);
            socket.on('join', ({ userName, roomName }) => {
                console.log("join request", { userName, roomName });
                this.join(userName, roomName, socket);
            });

            socket.on('sendMessage', ({ message, roomName }) => {
                console.log("message request", { message, roomName });
                socket.broadcast.to(roomName).emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log('disconnect');
                console.log(socket.rooms);
                this.rooms.forEach(room => {
                    let userName = room.removeUser(socket.id);
                    if (userName) {
                        socket.broadcast.to(room.name).emit('message', { text: userName + ' has left.', from: 'admin' });

                    }
                });
            });
        });
    }

    sendMessage(text: string, from: string) {

    }

    join(userName: string, roomName: string, socket: Socket) {
        try {
            if (!userName || !roomName) {
                console.log("bad request");
                socket.emit('error', { message: 'bad request' });
            }
            let room = this.rooms.find(r => r.name === roomName);
            if (!room) {
                room = new Room(roomName);
                this.rooms.push(room);
            }
            if (room.addUser(socket.id, userName)) {
                console.log(`${userName} added to room ${roomName}`);
                console.log(JSON.stringify(this.rooms))
                socket.join(roomName);
                socket.emit('message', { from: 'admin', text: 'Welcome to room' });
                socket.broadcast.to(roomName).emit('message', { text: userName + ' has joined.', from: 'admin' });
            } else {
                console.log("cannot add");
                socket.emit('error', new Error('User already exists'));
            }

        } catch (error) {
            console.log(error);
        }

    }
}