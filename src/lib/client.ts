import { Callbacks, Receiver } from "./shared";

export { Callbacks, Receiver };

// set promise<T> as return type of each function
export type Sender<T> = {
    [K in keyof T]: T[K] extends (...params: infer P) => infer R ? (...params: P) => Promise<R> : never;
};

export const createSender = <API>(socket: SocketIOClient.Socket) => {
    return new Proxy({}, {
        get(_, procedure) {
            return function (...params: any[]) {
                return new Promise(resolve => {
                    socket.emit("rpc", procedure, ...params, resolve);
                });
            };
        },
    }) as Sender<API>;
};

export const createReceiver = <API>(socket: SocketIOClient.Socket, callbacks: Callbacks<API>) => {
    const listener = (...params: any[]) => {
        const callbackName = params[0] as keyof API;
        const callback = callbacks[callbackName];

        if (callback) {
            const callbackParams = params.slice(1);

            callback(...callbackParams);
        }
    };

    socket.on("rpc", listener);

    return {
        unlisten: () => {
            socket.off("rpc", listener);
        },
    } as Receiver;
};
