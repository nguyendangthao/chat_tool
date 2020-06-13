import { AccountInterface } from "../interfaces/account.interface";
import { DataStoredInToken } from "../interfaces/authen.interface";
import * as jwt from 'jsonwebtoken';

export default class AuthenHelper {

    createToken(account: AccountInterface) {
        //  const expiresIn = 3 * 60 * 60; // 3 hours
        const expiresIn = 2 * 60; // 2'
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: account._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}

