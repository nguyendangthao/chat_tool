import * as mongoose from 'mongoose';
import ChannelModel from '../models/channel.model'
import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/httpException';
import AccountModel from '../models/account.model';
import ContactView from '../models_view/contact.view';

class ChannelService {
    public channel = ChannelModel;
    public account = AccountModel;
    public async create(req: any) {
        if (await this.channel.findOne({ account_name: req.account_name })) {
            throw new HttpException(500, `Account ${req.account_name} is exist.`);
        }
        if (await this.channel.findOne({ email: req.email })) {
            throw new HttpException(500, `Email ${req.email} is exist.`);
        }
        const hashedPassword = await bcrypt.hash(req.password, 10);
        let person = req.personal;
        let organi = req.organization;
        let result = await this.channel.create(
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
                // personal: {
                //     full_name: person.full_name,
                //     description: person.description,
                //     birth_day: person.birth_day,
                //     avatar: person.avatar,

                // },
                // organization: {
                //     o_code: organi.o_code,
                //     o_name: organi.o_name,
                //     o_tax_code: organi.o_tax_code,
                //     o_address: organi.o_address,
                //     o_email: organi.o_email,
                //     o_phone_number: organi.o_phone_number,
                //     bank_information: {
                //         bank_name: organi.bank_information.bank_name,
                //         account_holder: organi.bank_information.account_holder,
                //         accout_number: organi.bank_information.accout_number,
                //         branch_bank: organi.bank_information.branch_bank,
                //     }
                // }

            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }

    public async update(req: any) {

        let person = req.personal;
        let organi = req.organization;
        let result = await this.channel.updateOne({
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
        return await this.channel.find();
    }

    public async changePassword(req: any) {
        let acount: any = await this.channel.findOne({
            account_name: req.account_name
        });
        if (!acount) {
            throw new HttpException(500, `Account ${req.account_name} is not exist.`);
        }
        const hashedNewPassword = await bcrypt.hash(req.new_password, 10);
        const isPasswordMatching = await bcrypt.compare(req.password, acount.password);
        if (isPasswordMatching) {
            const result = await this.channel.updateOne({
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
        return await this.channel.find(query);

    }
    public async forgetPassword(req: any) {
        let acount: any = await this.channel.findOne({
            email: req.email
        });
        if (!acount) {
            throw new HttpException(500, `Email ${req.email} is not exist.`);
        }
        const hashedNewPassword = await bcrypt.hash(req.password, 10);
        const result = await this.channel.updateOne({
            email: req.email
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
        let exist = await this.channel.findById(body._id);
        if (!exist) {
            throw new HttpException(500, `Account is not exist.`);
        }
        const result = await this.channel.updateOne({
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
        let result = await this.channel.findById(_id);
        return result;
    }
    public async getChannels(body: any) {

        let channel = await this.channel.aggregate([
            {
                $match: {
                    'members.account_id': mongoose.Types.ObjectId(body._id),
                    $or: [
                        { name: { '$regex': body.keyValue, '$options': 'i' } },
                        { 'members.account_name': { '$regex': body.keyValue, '$options': 'i' } },
                    ]
                },
            },
            {
                $lookup:
                {
                    from: 'Account',
                    localField: 'members.account_id',
                    foreignField: '_id',
                    as: 'Accounts'
                }
            },
            {
                $project:
                {
                    _id: true,
                    name: true,
                    members: true,
                    messages: true,
                    updated_at: true,
                    avatar: true,
                    admin: true,
                    isGroup: true,
                    created_at: true,
                    Accounts: true
                }
            }
        ]);
        let result: ContactView[] = [];
        channel.forEach(e => {
            let obj = new ContactView();
            obj._id = e._id;
            obj.name = e.name;
            obj.messages = e.messages;
            obj.isGroup = e.isGroup
            if (e.isGroup) {
                obj.avatar = e.avatar;
            } else {
                let acc = e.Accounts.find((x: any) => x._id.toString() !== body._id);
                if (acc) {
                    obj.account_name = acc.account_name;
                    obj.account_id = acc._id
                    obj.avatar = acc.avatar;
                    obj.isOnline = acc.isOnline;
                }
            }
            result.push(obj)
        })
        return result;
    }

    public async createChannel(req: any) {
        let chanel = {
            _id: mongoose.Types.ObjectId(),
            name: req.name,
            members: req.members,
            messages: req.contact.messages,
            avatar: req.contact.avatar,
            isGroup: req.contact.isGroup,
        };
        if (!req.isGroup) {
            chanel.members = [{
                account_id: req.contact.account_id,
                account_name: req.contact.account_name,
            },
            {
                account_id: req.userSend._id,
                account_name: req.userSend.account_name,
            }
            ]
        }
        await this.channel.create(chanel);
        await chanel.members.forEach(async (item: any) => {
            let ac = await this.account.findById(item.account_id);
            await this.account.updateOne(
                { _id: item.account_id },
                {
                    channels: ac.channels ? [...ac.channels, {
                        channel_id: chanel._id,
                        channel_name: chanel.name
                    }] : [{
                        channel_id: chanel._id,
                        channel_name: chanel.name
                    }]
                });
        });

        return chanel;
    }

    public async addMessage(data: any) {
        let result = await this.channel.updateOne({
            _id: data._id
        },
            {
                messages: data.messages
            });
        if (result.nModified < 1) {
            return false;
        }
        return true;
    }
}

export default ChannelService;