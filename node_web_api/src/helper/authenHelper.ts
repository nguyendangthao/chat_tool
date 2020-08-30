import { AccountInterface } from "../interfaces/account.interface";
import { DataStoredInToken } from "../interfaces/authen.interface";
import * as jwt from 'jsonwebtoken';

export default class AuthenHelper {

    createToken(account: AccountInterface) {
        //  const expiresIn = 3 * 60 * 60; // 3 hours
        const expiresIn = 0.5 * 60 * 60; //30'
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: account._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
    createRereshToken(account: AccountInterface) {
        //  const expiresIn = 3 * 60 * 60; // 3 hours
        const expiresIn = 24 * 60 * 60; //1d
        const secret = process.env.JWT_REFRESH_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: account._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}

