import Controller from "interfaces/controller.interface";
import * as express from 'express';
import validationMiddleware from "../middlewares/validation.middleware";
import HttpException from "../exceptions/httpException";
import ChannelService from "../services/channel.service";
import { AccountCreateVal, AccountUpdateVal } from "../validates/account.validate";
import PaginatedResult from "../helper/paginatedResult";
import authMiddleware from "../middlewares/auth.middleware";
import { SendEmailHelper } from "../helper/sendEmailHelper";
import { Email_Recovey_Password, Email_Create_Account } from "../utils/constans";
import * as mongoose from 'mongoose';
import * as multer from "multer";
import * as formidable from 'formidable';
let fs = require('fs');
import { tempEmailCreateNewAcc, tempEmailReCoveryPass } from '../utils/temeplateEmail';
import * as redis from 'redis';
const reds = redis.createClient();

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

class ChannelController implements Controller {

    public router = express.Router();
    public path = '/channel';
    public channelService = new ChannelService();
    public objectId = mongoose.Types.ObjectId;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + '/getAll', authMiddleware, this.getAll)
            .post(this.path + '/create', authMiddleware, this.create)
            .post(this.path + '/update', authMiddleware, validationMiddleware(AccountUpdateVal), this.update)
            .post(this.path + '/changePassword', this.changePassword)
            .post(this.path + '/find', authMiddleware, this.find)
            .post(this.path + '/forgetPassword', this.forgetPassword)
            .post(this.path + '/uploadAvatar', upload.single('avatar'), this.uploadAvatar)
            .get(this.path + '/getAvatar' + '/:avatar', this.getAvatar)
            .post(this.path + '/uploadMulti', upload.array('avatar', 3), this.uploadMulti)
            .post(this.path + '/uploadFormidable', this.uploadFormidable)

            .get(this.path + '/detail' + '/:_id', authMiddleware, this.detail)
            .post(this.path + '/getChannels', authMiddleware, this.getChannels)
            .post(this.path + '/uploadAvatar', upload.single('avatar'), this.uploadAvatar)
    }
    private getAll = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let data = await this.channelService.getAll();
        if (!data) {
            next(new HttpException(500, 'error'));
            return false;
        }
        response.send(new PaginatedResult(request.body.page_number, request.body.page_size, data));
    }
    private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.channelService.create(request.body);
            if (result) {
                const temp = tempEmailCreateNewAcc(request.body);
                SendEmailHelper(request.body.email, Email_Create_Account, '', temp);
            }
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }

    }
    private update = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.channelService.update(request.body);
            response.send({
                status: result,
            });

        } catch (error) {
            next(error);
        }

    }
    private changePassword = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let email = await this.channelService.changePassword(request.body);
            if (email) {
                await SendEmailHelper(email, 'Change PassWord', Email_Recovey_Password, ``);
            }
            response.send({
                status: true,
            });
        } catch (error) {
            next(error);
        }

    }
    private find = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let data = await this.channelService.find(request.body);
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
        try {
            let data = await this.channelService.forgetPassword(request.body);
            if (data) {
                const temp = tempEmailReCoveryPass(request.body);
                SendEmailHelper(request.body.email, Email_Recovey_Password, '', temp);
            }
            response.send({
                status: data,
            });
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
        try {
            const _id = request.params._id;
            if (!this.objectId.isValid(_id)) {
                next(new HttpException(400, `Id is invalid`));
            }
            let result = await this.channelService.detail(_id);
            return response.send(result);
        } catch (er) {
            return next(er);
        }

    }
    private getChannels = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            reds.hmget('ch', ['name', 'age', 'addr', 'phone'], async (err, result) => {
                if (err) {

                }
                if (result) {

                }
            });
            reds.hgetall("ch", function (err, object) {
                console.log(object);
            });

            reds.rpush('rpush', ['vegetable', 'carrot', 'celery','apple'], function (err, reply) {
                console.log(reply);
            });

            reds.lrange("rpush", 2, 1, function (err, reply) {
                console.log(reply);
            });
            reds.get('channel', async (err, result) => {
                if (err) {
                    return next(err);
                }
                if (result) {
                    let data = JSON.parse(result);
                    reds.hmset('ch', [
                        'name', 'van A',
                        'age', 12,
                        'addr', 'HN',
                        'phone', 1212121212,
                    ], (err, r1) => {
                        if (err) {
                            return next(err);
                        }
                        if (r1) {
                        }
                    });


                    return response.send(data);
                }
                if (!result) {
                    let data = await this.channelService.getChannels(request.body)
                    reds.set('channel', JSON.stringify(data));
                    return response.send(data);
                }
            });

            // original
            // let data = await this.channelService.getChannels(request.body)
            // return response.send(data);

        } catch (er) {
            return next(er);
        }
    }
    private uploadAvatar = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            if (!request.file) {
                return response.send("don't have file");
            }
            if (!this.objectId.isValid(request.body._id)) {
                next(new HttpException(500, `Don't have Channel change`));
            }
            const objAccount: any = {
                _id: request.body._id,
                avatar: request.file.filename
            }
            const result = await this.channelService.uploadAvatar(objAccount);
            if (!result) {
                next(new HttpException(500, 'Fall'));
            }
            return response.send({ "avatar": request.file.filename });
        } catch (er) {
            return next(er);
        }
    }
}
export default ChannelController;