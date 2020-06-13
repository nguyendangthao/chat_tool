import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import accountModel from '../models/account.model';
import HttpException from '../exceptions/httpException';
import { RequestWithUser, DataStoredInToken } from '../interfaces/authen.interface';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const token = request.headers['authorization'];
  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      jwt.verify(token, secret, async function (err, decoded: DataStoredInToken) {
        if (err) {
          return next(new HttpException(401, err.message));
        }
        if (decoded) {
          const account = await accountModel.findById(decoded._id);
          if (account && !account.lock) {
            account.password = undefined;
            request.account = account;
            next();
          } else {
            return next(new HttpException(401, 'Account  is locked.'));
          }
        }
      });
    } catch (error) {
      return next(new HttpException(401, 'Token wrong'));
    }
  } else {
    return next(new HttpException(401, 'Authentication token missing'));
  }
}

export default authMiddleware;
