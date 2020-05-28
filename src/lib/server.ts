import * as socketio from "socket.io";
import { Callbacks, Receiver } from "./shared";

export { Callbacks, Receiver };

// adds sockets array as first param to each function
export type Sender<T> = {
    [K in keyof T]: T[K] extends (...params: infer P) => infer R ? (sockets: socketio.Socket[], ...params: P) => R : never;
};

export const createSender = <API>() => {
    return new Proxy({}, {
        get(_, procedure) {
            return function (sockets: socketio.Socket[], ...params: any[]) {
                sockets.forEach(socket => socket.emit("rpc", procedure, ...params));
            };
        },
    }) as Sender<API>;
};

export const createReceiver = <API>(socket: socketio.Socket, callbacks: Callbacks<API>) => {
    const listener = async (...params: any[]) => {
        const callbackName = params[0] as keyof API;
        const callback = callbacks[callbackName];

        if (callback) {
            const callbackParams = params.slice(1, -1);
            const ackFn = params[params.length - 1];

            try {
                const result = await callback(...callbackParams);
                
                ackFn({ type: "success", data: result });
            } catch(e) {
                ackFn({ type: "error", data: e.message });
            }
        }
    };

    socket.on("rpc", listener);

    return {
        unlisten: () => {
            socket.off("rpc", listener);
        },
    } as Receiver;
};
