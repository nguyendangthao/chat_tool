import * as mongoose from 'mongoose';
import { AccountInterface } from '../interfaces/account.interface';

const AccountSchema = new mongoose.Schema({

    account_name: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    phone_number: { type: Number, trim: true },
    lock: { type: Boolean, default: false },
    status: { type: String, uppercase: true, trim: true },
    created_id: { type: mongoose.Schema.Types.ObjectId },
    scope_access: { type: String, uppercase: true, trim: true },
    roles: [
        { type: mongoose.Schema.Types.ObjectId }
    ],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
    // had better research model again
    personal: {
        full_name: { type: String, trim: true },
        birth_day: { type: String, trim: true },
        avatar: { type: String, trim: true, default: null },
        description: { type: String, trim: true },
    },
    organization: {
        o_code: { type: String, trim: true, unique: true },
        o_name: { type: String, trim: true },
        o_tax_code: { type: String, trim: true },
        o_address: { type: String, trim: true },
        o_email: { type: String, trim: true },
        o_phone_number: { type: Number, trim: true },
        bank_information: {
            bank_name: { type: String, trim: true },
            account_holder: { type: String, trim: true },
            accout_number: { type: String, trim: true },
            branch_bank: { type: String, trim: true },
        }
    }
}, { versionKey: false });

AccountSchema.set('collection', 'Account');

const accountSchema = mongoose.model<AccountInterface & mongoose.Document>('Account', AccountSchema);

export default accountSchema;