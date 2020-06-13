import { AccountInterface } from "./account.interface";
import { Request } from 'express';

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    _id: string;
}
export interface RequestWithUser extends Request {
    account: AccountInterface;
}


