import io from "socket.io-client";

export default class RootSocket {
    constructor() {
        this.socket = io.connect('http://127.10.0.1:3333', { // or http://localhost:3333
            path: '/chat/socket.io',
        });
    }

}
