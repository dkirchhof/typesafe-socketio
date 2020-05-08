interface IClientToServer {
    add: (a: number, b: number) => number;
    doIt: () => void;
}

interface IServerToClient {
    sayHello: (greeting: string) => void;    
}
