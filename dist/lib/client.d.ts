/// <reference types="socket.io-client" />
import { Callbacks, Receiver } from "./shared";
export { Callbacks, Receiver };
export declare type Sender<T> = {
    [K in keyof T]: T[K] extends (...params: infer P) => infer R ? (...params: P) => Promise<R> : never;
};
export declare const createSender: <API>(socket: SocketIOClient.Socket) => Sender<API>;
export declare const createReceiver: <API>(socket: SocketIOClient.Socket, callbacks: Callbacks<API>) => Receiver;
