import channelServer from '../services/channel.service';
import ChannelService from '../services/channel.service';
import * as mongoose from 'mongoose';
export default class ChatSocketHelper {
    public channelService = new ChannelService();
    constructor() { }

    async send_message_client(data: any) {
        if (!data.contact._id) {
            const contact = await this.channelService.createChannel(data)
            if (contact)
                return contact;
        } else {
            const re = await this.channelService.addMessage(data.contact);
            if (re)
                return data.contact;
        }
    }
}
