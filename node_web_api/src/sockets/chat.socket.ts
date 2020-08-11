import ChatSocketHelper from '../helper/chatsocketHelper';

export default class ChatSocket {
    private chatSocketHelper = new ChatSocketHelper();

    constructor(io: any) {
        io.on("connection", (socket: any) => {
            try {
                // handle disconnect
                socket.on("disconnect", () => {
                });
                socket.on("send_message_client", async (data: any) => {
                    var result = await this.chatSocketHelper.send_message_client(data);
                    if (result) {
                        io.emit("send_message_server", result)
                    }
                })
                socket.on("add_group_client", async (data: any) => {
                    var result = await this.chatSocketHelper.add_group_client(data);
                    if (result) {
                        io.emit("add_group_server", result)
                    }
                })
                socket.on("update_group_client", async (data: any) => {
                    var result = await this.chatSocketHelper.update_group_client(data);
                    if (result) {
                        io.emit("update_group_server", result)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        });
    }


}