import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initCORS();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
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
    // this.app.listen(3333, '127.10.0.1', () => {  //set hostname
    //   console.log(`App listening on the port ${process.env.PORT}`);
    // });
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the hostname:127.0.0.1  port ${process.env.PORT}`);
    });
  }

  // public getServer() {
  //   return this.app;
  // }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json({ limit: '20mb' }));
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
}

export default App;
