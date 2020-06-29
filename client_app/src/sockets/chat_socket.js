import io from "socket.io-client";
import RootSocket from "./root_socket";

// export const ChatSocket = () => {
//     try {
//     let socket = null;
//         socket = io.connect('http://127.10.0.1:3333', { // or http://localhost:3333
//             path: '/chat/socket.io',
//         });
//         // socket.emit("demo1", { data: { name: 'aaa' } })
//         socket.on("demo", (data) => {
//             debugger
//         })

//         return socket;
//     }
//     catch (error) {
//         console.log(error)
//     }

// };

export default class ChatSocket extends RootSocket {
    constructor() {
        super()
        try {
            this.socket.on("send_message_server", (data) => {
            })
        }
        catch (error) {
            console.log(error)
        }
    }

}


