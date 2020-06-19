import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import TypeORM from "./database";
import routes from "../routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.settings();
    this.middleware();
    this.routes();
  }
  settings = () => {
    this.app.disable("x-powered-by");
    this.app.set("PORT", process.env.PORT || process.env.PORT_HTTP || 4555);
  };
  middleware = () => {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    process.env.NODE_ENV !== "production" ? this.app.use(morgan("dev")) : null;
  };
  routes = () => {
    this.app.use(routes);
  };
  listen = async (devPort?: number) => {
    const port: number | string = devPort ? devPort : this.app.get("PORT");
    this.app.listen(port, async () => {
      await TypeORM.init();
      console.info(`Server run, on port ${port} ENV ${process.env.NODE_ENV}`);
    });
  };
}

export default App;
