"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSender = (socket) => {
    return new Proxy({}, {
        get(_, procedure) {
            return function (...params) {
                return new Promise(resolve => {
                    socket.emit("rpc", procedure, ...params, resolve);
                });
            };
        },
    });
};
exports.createReceiver = (socket, callbacks) => {
    const listener = (...params) => {
        const callbackName = params[0];
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
    };
};
