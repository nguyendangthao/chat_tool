
import RootSocket from "../sockets/root_socket";

class ActionChatSocket extends RootSocket {
    constructor() {
        super()
    }
    sendMessage(data) {
        this.socket.emit('send_message_client', data);
    }
    addGroup(data) {
        this.socket.emit('add_group_client', data);
    }
    updateGroup(data) {
        this.socket.emit('update_group_client', data);
    }
}
export default new ActionChatSocket();
