import { Socket } from "socket.io";
import { Callbacks, Receiver } from "./shared";
export { Callbacks, Receiver };
export declare type Sender<T> = {
    [K in keyof T]: T[K] extends (...params: infer P) => infer R ? (sockets: Socket | Socket[], ...params: P) => R : never;
};
export declare const createSender: <API>() => Sender<API>;
export declare const createReceiver: <API>(socket: Socket, callbacks: Callbacks<API>) => Receiver;
