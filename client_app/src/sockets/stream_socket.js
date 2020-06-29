import RootSocket from "./root_socket";

export default class StreamSocket extends RootSocket {
    constructor() {
        super()
        try {
            this.socket.on("demo", (data) => {
                debugger
            })
        }
        catch (error) {
            console.log(error)
        }
    }

}
