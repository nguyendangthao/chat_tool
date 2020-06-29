
export default class ChatSocket {
    constructor(io: any) {
        io.on("connection", (socket: any) => {
            try {
                // handle disconnect
                socket.on("disconnect", () => {

                });
                socket.on("send_message_client", (data: any) => {
                    io.emit("send_message_server", { data: { data } })
                })
                socket.emit("demo", { d: { name: '111' } })

            } catch (error) {
                console.log(error)
            }
        });
    }


}