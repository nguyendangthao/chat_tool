import * as mongoose from 'mongoose';
import { IChannel } from '../interfaces/Channel.interface';

const ChannelSchema = new mongoose.Schema({

    name: { type: String, trim: true, },
    members: [
        {
            account_id: { type: mongoose.Types.ObjectId, required: true, },
            account_name: { type: String, required: true },
        }
    ],
    messages: [
        {
            account_id: { type: mongoose.Types.ObjectId, required: true, },
            account_name: { type: String, required: true },
            message: { type: String },
            time: { type: Date, default: new Date() },
        }
    ],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
    avatar: { type: String },
    admin: {
        account_id: { type: mongoose.Types.ObjectId },
        account_name: { type: String, },
    },
    isGroup: { type: Boolean, default: false },

}, { versionKey: false });

ChannelSchema.set('collection', 'Channel');
const channelSchema = mongoose.model<IChannel & mongoose.Document>('Channel', ChannelSchema);
export default channelSchema;
