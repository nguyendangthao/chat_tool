import * as mongoose from 'mongoose';
import { RoleInterface } from '../interfaces/role.interface';
import RoleModel from '../models/role.model'
import HttpException from '../exceptions/httpException';

class RoleService {
    public role = RoleModel;

    public async create(req: RoleInterface) {
        if (await this.role.findOne({ name: req.name })) {
            throw new HttpException(500, `Role ${req.name} is exist.`);
        }
        let result = await this.role.create(
            {
                name: req.name,
                description: req.description,
                lock: req.lock,
            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }

    public async update(req: RoleInterface) {

        let result = await this.role.updateOne({
            _id: mongoose.Types.ObjectId(req._id)
        },
            {
                name: req.name,
                description: req.description,
                lock: req.lock,
                updated_at: new Date()
            }
        );
        if (result.nModified < 1) {
            return false;
        }
        return true;
    }

}
export default RoleService;