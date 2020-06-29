import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import ChatSocket from './sockets/chat.socket';
import * as socket from 'socket.io';
import * as http from 'http';

class App {
  public app: express.Application;
  public server: any;
  public io: any;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initCORS();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    //this.initializeSocket();
    this.initializeServerAndSocket();
  }

  public initCORS() {
    const options: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Cookie", "Authorization"],
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false
    };
    this.app.use(cors(options));
    this.app.options("*", cors(options));
    this.initializeErrorHandling();
  }

  public listen() {

    // http://127.0.0.1:process.env.PORT
    // this.app.listen(3333, '127.0.0.1', () => {  //set hostname
    //   console.log(`App listening on the port ${process.env.PORT}`);
    // });

    // this.app.listen(process.env.PORT, () => {
    //   console.log(`App listening on the hostname:127.0.0.1  port ${process.env.PORT}`);
    // });


    this.server.listen(process.env.PORT, function () {
      console.log(`App listening on the hostname: http://127.10.0.1: or http://localhost:  port ${process.env.PORT}`);
    });
  }

  // public getServer() {
  //   return this.app;
  // }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json({ limit: '20mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/v1", controller.router);
    });
  }

  private connectToTheDatabase() {
    const {
      DATABASE,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(MONGO_PATH + DATABASE, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
  }
  private initializeSocket() {
    // have 2 ways init server soket combine with express
    // 1: init listen separate express 1 port listen - socket 1 port
    // 2: innit together one listen


    //Init server with socket.io and listen io
    const server = http.createServer(this.app);
    const io = socket(server, { path: "/chat/socket.io" });
    new ChatSocket(io);
    server.listen(3001, function () {
      console.log('listening socket on  *:3001');
    });

  }
  private initializeServerAndSocket() {
    // innit together export and socket one port
    this.server = http.createServer(this.app);
    this.io = socket(this.server, { path: "/chat/socket.io" });
    new ChatSocket(this.io);
  }
}

export default App;
