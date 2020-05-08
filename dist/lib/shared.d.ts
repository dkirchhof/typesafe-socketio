export declare type Callbacks<T> = {
    [K in keyof T]?: T[K] extends (...params: infer P) => infer R ? (...params: P) => R : never;
};
export declare type Receiver = {
    unlisten: () => void;
};
