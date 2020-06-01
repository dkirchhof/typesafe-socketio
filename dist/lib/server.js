"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReceiver = exports.createSender = void 0;
exports.createSender = () => {
    return new Proxy({}, {
        get(_, procedure) {
            return function (sockets, ...params) {
                sockets.forEach(socket => socket.emit("rpc", procedure, ...params));
            };
        },
    });
};
exports.createReceiver = (socket, callbacks) => {
    const listener = async (...params) => {
        const callbackName = params[0];
        const callback = callbacks[callbackName];
        if (callback) {
            const callbackParams = params.slice(1, -1);
            const ackFn = params[params.length - 1];
            try {
                const result = await callback(...callbackParams);
                ackFn({ type: "success", data: result });
            }
            catch (e) {
                ackFn({ type: "error", data: e.message });
            }
        }
    };
    socket.on("rpc", listener);
    return {
        unlisten: () => {
            socket.off("rpc", listener);
        },
    };
};
