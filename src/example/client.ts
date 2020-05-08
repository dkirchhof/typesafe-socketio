import { connect } from "socket.io-client";
import { createSender, createReceiver } from "../lib/client";

const main = async () => {
    const socket = connect("http://localhost:8080");

    const receiver = createReceiver<IServerToClient>(socket, {
        sayHello: (greeting: string) => console.log(greeting),
    });

    const sender = createSender<IClientToServer>(socket);

    const result1 = await sender.doIt();
    const result2 = await sender.add(20, 22);

    console.log(result1, result2);

    receiver.unlisten();
    socket.close();
};

main();
