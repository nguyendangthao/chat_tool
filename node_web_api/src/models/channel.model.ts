import * as mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({

    name: { type: String, trim: true, required: true, },
    members: [
        {
            user_id: { type: mongoose.Types.ObjectId, required: true, },
            user_name: { type: String, required: true },
        }
    ],
    messages: [
        {
            user_id: { type: mongoose.Types.ObjectId, required: true, },
            user_name: { type: String, required: true },
            message: { type: String },
            time: { type: Date, default: new Date() },
        }
    ],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
    avatar: { type: String },
    admin: {
        user_id: { type: mongoose.Types.ObjectId },
        user_name: { type: String, },
    }

}, { versionKey: false });

ChannelSchema.set('collection', 'Channel');

const channelSchema = mongoose.model('Channel', ChannelSchema, 'Channel');

export default channelSchema;