import * as socketio from "socket.io";
import { createReceiver, createSender } from "../lib/server";

const server = socketio(8080);

server.on("connection", socket => {
    createReceiver<IClientToServer>(socket, {
        add: (a, b) => a + b,
        doIt: () => { throw new Error("can't do it"); },
    });

    const sender = createSender<IServerToClient>();

    sender.sayHello([socket] ,"hello daniel");
});
