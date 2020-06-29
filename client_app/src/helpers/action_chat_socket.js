
import RootSocket from "../sockets/root_socket";

class ActionChatSocket extends RootSocket {
    constructor() {
        super()
    }
    sendMessage(data) {
        this.socket.emit('send_message_client', data);
    }
}
export default new ActionChatSocket();
