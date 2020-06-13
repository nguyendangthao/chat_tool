import * as mongoose from 'mongoose';
import { AccountInterface } from '../interfaces/account.interface';
import AccountModel from '../models/account.model'
import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/httpException';

class AccountService {
    public account = AccountModel;

    public async create(req: AccountInterface) {
        if (await this.account.findOne({ account_name: req.account_name })) {
            throw new HttpException(500, `Account ${req.account_name} is exist.`);
        }
        if (await this.account.findOne({ email: req.email })) {
            throw new HttpException(500, `Email ${req.email} is exist.`);
        }
        const hashedPassword = await bcrypt.hash(req.password, 10);
        let person = req.personal;
        let organi = req.organization;
        let result = await this.account.create(
            {
                account_name: req.account_name,
                email: req.email,
                phone_number: req.phone_number,
                lock: req.lock,
                status: req.status,
                created_id: req.created_id || mongoose.Types.ObjectId(),
                scope_access: req.scope_access,
                roles: req.roles,
                password: hashedPassword,
                personal: {
                    full_name: person.full_name,
                    description: person.description,
                    birth_day: person.birth_day,
                    avatar: person.avatar,

                },
                organization: {
                    o_code: organi.o_code,
                    o_name: organi.o_name,
                    o_tax_code: organi.o_tax_code,
                    o_address: organi.o_address,
                    o_email: organi.o_email,
                    o_phone_number: organi.o_phone_number,
                    bank_information: {
                        bank_name: organi.bank_information.bank_name,
                        account_holder: organi.bank_information.account_holder,
                        accout_number: organi.bank_information.accout_number,
                        branch_bank: organi.bank_information.branch_bank,
                    }
                }

            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }

    public async update(req: AccountInterface) {

        let person = req.personal;
        let organi = req.organization;
        let result = await this.account.updateOne({
            _id: mongoose.Types.ObjectId(req._id)
        },
            {
                account_name: req.account_name,
                category_id: mongoose.Types.ObjectId(),
                email: req.email,
                phone_number: req.phone_number,
                lock: req.lock,
                status: req.status,
                scope_access: req.scope_access,
                roles: req.roles,
                personal: {
                    full_name: person.full_name,
                    description: person.description,
                    birth_day: person.birth_day,
                    avatar: person.avatar,

                },
                organization: {
                    o_code: organi.o_code,
                    o_name: organi.o_name,
                    o_tax_code: organi.o_tax_code,
                    o_address: organi.o_address,
                    o_email: organi.o_email,
                    o_phone_number: organi.o_phone_number,
                    bank_information: {
                        bank_name: organi.bank_information.bank_name,
                        account_holder: organi.bank_information.account_holder,
                        accout_number: organi.bank_information.accout_number,
                        branch_bank: organi.bank_information.branch_bank,
                    }
                }

            }
        );
        if (result.nModified < 1) {
            return false;
        }
        return true;
    }

    public async getAll() {
        return await this.account.find();
    }

    public async changePassword(req: any) {
        let acount: any = await this.account.findOne({
            account_name: req.account_name
        });
        if (!acount) {
            throw new HttpException(500, `Account ${req.account_name} is not exist.`);
        }
        const hashedNewPassword = await bcrypt.hash(req.new_password, 10);
        const isPasswordMatching = await bcrypt.compare(req.password, acount.password);
        if (isPasswordMatching) {
            const result = await this.account.updateOne({
                account_name: req.account_name
            },
                {
                    password: hashedNewPassword
                });
            if (result.nModified < 1) {
                return '';
            }
            return acount.email;
        }
        else {
            throw new HttpException(500, `Old password is wrong.`);
        }
    }
    public async find(req: any) {
        let query: any = {};
        if (req.account_name)
            query.account_name = req.account_name;
        if (req.email)
            query.email = req.email;
        if (req.full_name)
            query['personal.full_name'] = req.full_name;
        query['$or'] = [
            { status: 'NEW' },
            { status: 'EDIT' },
            { status: 'DRAFF' }
        ];
        return await this.account.find(query);

    }
    public async forgetPassword(req: any) {
        let acount: any = await this.account.findOne({
            account_name: req.account_name
        });
        if (!acount) {
            throw new HttpException(500, `Account ${req.account_name} is not exist.`);
        }
        const hashedNewPassword = await bcrypt.hash(req.new_password, 10);
        const result = await this.account.updateOne({
            account_name: req.account_name
        },
            {
                password: hashedNewPassword
            });
        if (result.nModified < 1) {
            return false;
        }
        return true;
    }
    public async uploadAvatar(body: any) {
        let exist = await this.account.findById(body._id);
        if (!exist) {
            throw new HttpException(500, `Account is not exist.`);
        }
        const result = await this.account.updateOne({
            _id: mongoose.Types.ObjectId(body._id)
        },
            {
                'personal.avatar': body.avatar,

            });
        if (result.nModified < 1) {
            return false;
        }
        return true;
    }
    public async detail(_id: string) {
        let result = await this.account.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(_id)
                }
            },
            {
                $lookup:
                {
                    from: 'Role',
                    localField: 'roles',
                    foreignField: '_id',
                    as: 'roles'
                }
            },
            {
                $project:
                {
                    _id: true,
                    lock: true,
                    roles: true,
                    status: true,
                    updated_at: true,
                    account_name: true,
                    email: true,
                    personal: true,
                    phone_number: true,
                    scope_access: true,
                    created_at: true,
                }
            }
        ]);
        return result[0];
    }
}
export default AccountService;