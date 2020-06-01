"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReceiver = exports.createSender = void 0;
exports.createSender = (socket) => {
    return new Proxy({}, {
        get(_, procedure) {
            return function (...params) {
                return new Promise((resolve, reject) => {
                    socket.emit("rpc", procedure, ...params, (response) => {
                        if (response.type === "success") {
                            resolve(response.data);
                        }
                        else if (response.type === "error") {
                            reject(response.data);
                        }
                    });
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
