import Controller from "interfaces/controller.interface";
import * as express from 'express';
import validationMiddleware from "../middlewares/validation.middleware";
import HttpException from "../exceptions/httpException";
import AccountService from "../services/account.service";
import { AccountCreateVal, AccountUpdateVal } from "../validates/account.validate";
import PaginatedResult from "../helper/paginatedResult";
import authMiddleware from "../middlewares/auth.middleware";
import { SendEmailHelper } from "../helper/sendEmailHelper";
import { Email_Change_Password_Context } from "../utils/constans";
import * as mongoose from 'mongoose';
import * as multer from "multer";
import * as formidable from 'formidable';
let fs = require('fs');

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            if (file.mimetype.includes('image'))
                next(null, 'src/uploads/images');
            else
                next(null, 'src/uploads/files');
        },
        filename: function (req, file, next) {
            if (file.mimetype.includes('image')) {
                const ext = file.mimetype.split('/')[1];
                next(null, "avatar" + '-' + Date.now() + '.' + ext);
            } else {
                next(null, Date.now() + '-' + file.originalname);
            }

        },
    })
});

class AccountController implements Controller {

    public router = express.Router();
    public path = '/account';
    public accountService = new AccountService();
    public objectId = mongoose.Types.ObjectId;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + '/getAll', authMiddleware, this.getAll)
            .post(this.path + '/create', authMiddleware, validationMiddleware(AccountCreateVal), this.create)
            .post(this.path + '/update', authMiddleware, validationMiddleware(AccountUpdateVal), this.update)
            .post(this.path + '/changePassword', this.changePassword)
            .post(this.path + '/find', authMiddleware, this.find)
            .post(this.path + '/forgetPassword', this.forgetPassword)
            .post(this.path + '/uploadAvatar', upload.single('avatar'), this.uploadAvatar)
            .get(this.path + '/getAvatar' + '/:avatar', this.getAvatar)
            .post(this.path + '/uploadMulti', upload.array('avatar', 3), this.uploadMulti)
            .post(this.path + '/uploadFormidable', this.uploadFormidable)
            .get(this.path + '/detail' + '/:_id', this.detail)
    }
    private getAll = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let data = await this.accountService.getAll();
        if (!data) {
            next(new HttpException(500, 'error'));
            return false;
        }
        response.send(new PaginatedResult(request.body.page_number, request.body.page_size, data));
    }
    private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.accountService.create(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }

    }
    private update = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.accountService.update(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }

    }
    private changePassword = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let email = await this.accountService.changePassword(request.body);
            if (email) {
                await SendEmailHelper(email, 'Change PassWord', Email_Change_Password_Context, ``);
            }
            response.send({
                status: true,
            });
        } catch (error) {
            next(error);
        }

    }
    private find = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let data = await this.accountService.find(request.body);
        if (!data) {
            // next(new UserDataIsNotExist());
            return false;
        }
        // response.send({
        //     data: data,
        // });
        response.send(data);
    }
    private forgetPassword = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let data = await this.accountService.forgetPassword(request.body);
        response.send({
            status: data,
        });
    }
    private uploadAvatar = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if (!request.file) {
                return response.send("don't have file");
            }
            if (!this.objectId.isValid(request.body._id)) {
                next(new HttpException(500, `Don't have Account change`));
            }
            const objAccount: any = {
                _id: request.body._id,
                avatar: request.file.filename
            }
            const result = await this.accountService.uploadAvatar(objAccount);
            if (!result) {
                next(new HttpException(500, 'Fall'));
            }
            return response.send({ "avatar": request.file.filename });
        } catch (er) {
            return next(er);
        }
    }
    private getAvatar = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const avatar = request.params.avatar;
        return response.sendFile(process.cwd() + '/src/uploads/images/' + avatar, (error) => {
            if (error)
                response.send(error.message);
        });
    }
    private uploadMulti = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if (!request.files) {
                return response.send("don't have file");
            }
            return response.send({ "avatar": request.files });
        } catch (er) {
            return next(er);
        }
    }
    private uploadFormidable = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let form = new formidable.IncomingForm();
            form.uploadDir = "src/uploads/images/";
            form.parse(request, (err, fields, files) => {
                if (err) throw err;
                let newPath = form.uploadDir + files.avatar.name; //avatar name of form data from client
                let tmpPath = files.avatar.path;
                //rename file name
                fs.rename(tmpPath, newPath, (err: any) => {
                    if (err) throw err;
                })
            });
            return response.send({ "avatar": '' });
        } catch (er) {
            return next(er);
        }
    }
    private detail = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const _id = request.params._id;
        if (!this.objectId.isValid(_id)) {
            next(new HttpException(400, `Id is invalid`));
        }

        let result = await this.accountService.detail(_id);
        // let finalResult: any = {
        //     updated_at: result.updated_at,
        //     account_name: result.account_name,
        //     password: result.password,
        //     lock: result.lock,
        //     status: result.status,
        //     email: result.email,
        //     personal: result.personal,
        //     phone_number: result.phone_number,
        //     scope_access: result.scope_access,
        //     created_at: result.created_at,
        //     roles: result.roles
        // }
        // for (let i = 0; i < result.roles.length; i++) {
        //     finalResult.roles.push({
        //         _id: result.roles[i]._id,
        //         name: result.roles[i].name
        //     });
        // }
        return response.send(result);
    }
}
export default AccountController;