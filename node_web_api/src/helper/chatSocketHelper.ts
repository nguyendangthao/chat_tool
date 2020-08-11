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
    async add_group_client(data: any) {
        return await this.channelService.addGroupChannel(data)
    }
    async update_group_client(data: any) {
        return await this.channelService.updateGroupChannel(data)
    }
}
