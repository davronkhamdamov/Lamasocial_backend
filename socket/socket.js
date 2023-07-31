import { Server } from 'socket.io'
export default function (server) {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://lcoalhost:3000",
        },
    });
    io.on('connection', (socket) => {
        console.log(socket);
    })

}