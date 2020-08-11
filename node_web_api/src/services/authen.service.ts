import * as mongoose from 'mongoose';
import * as express from 'express';
import AccountModel from '../models/account.model';
import HttpException from '../exceptions/httpException';
import * as bcrypt from 'bcrypt';

class AuthenService {
    public account = AccountModel;

    public async login(req: any) {
        let acc = await this.account.findOne({ email: req.email });
        if (!acc) {
            throw new HttpException(500, `Email ${req.email} is not exist.`);
        }
        else {
            const isPasswordMatching = await bcrypt.compare(req.password, acc.password);
            if (!isPasswordMatching)
                throw new HttpException(500, `Password is not correct.`);
            // if (acc.lock)
            //     throw new HttpException(500, `Email ${req.email} is lock.`);
            await this.account.updateOne({
                _id: acc._id
            },
                {
                    isOnline: true
                });
            acc.password = null;
            acc.isOnline = true
            return acc;
        }

    }

    public async logout(req: any) {

    }
}
export default AuthenService;