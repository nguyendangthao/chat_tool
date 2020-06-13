import * as mongoose from 'mongoose';
import { RoleInterface } from '../interfaces/role.interface';

const roleSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true },
    lock: { type: Boolean, default: false },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, { versionKey: false });

roleSchema.set('collection', 'Role');

const roleModel = mongoose.model<RoleInterface & mongoose.Document>('Role', roleSchema);

export default roleModel;