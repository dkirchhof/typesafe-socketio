interface IClientToServer {
    add: (a: number, b: number) => number;
}
interface IServerToClient {
    sayHello: (greeting: string) => void;
}
