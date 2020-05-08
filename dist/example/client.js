"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const client_1 = require("../lib/client");
const main = async () => {
    const socket = socket_io_client_1.connect("http://localhost:8080");
    const receiver = client_1.createReceiver(socket, {
        sayHello: (greeting) => console.log(greeting),
    });
    const sender = client_1.createSender(socket);
    const result1 = await sender.doIt();
    const result2 = await sender.add(20, 22);
    console.log(result1, result2);
    receiver.unlisten();
    socket.close();
};
main();
