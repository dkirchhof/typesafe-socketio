"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const server_1 = require("../lib/server");
const server = socketio(8080);
server.on("connection", socket => {
    server_1.createReceiver(socket, {
        add: (a, b) => a + b,
        doIt: () => { throw new Error("can't do it"); },
    });
    const sender = server_1.createSender();
    sender.sayHello([socket], "hello daniel");
});
