import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { runInNewContext } from "vm";

class HandleErrors extends Error {
  message: string;
  path: string;

  constructor(message: string, path: string) {
    super(message);
    this.message = message;
    this.path = path;
  }

  public static handleErrorTypes = (error: any, req: Request, res: Response, next: NextFunction) => {
    //console.log("Handle Error");
    //console.log(typeof error.toJson === "function");
    let message = error.message || "Something went wrong";
    let path = error.path || "Unknow path error";

    let errorObject: ObjectError = {
      ok: false,
      name: error.name,
      status: 500,
      message,
      path,
    };

    if (typeof error.toJson === "function") {
      errorObject = error.toJson();
    }

    return res.status(errorObject.status).json(errorObject);
  };
}

type ObjectError = {
  ok: boolean;
  name: string;
  status: number;
  message: string;
  path: string;
};

export default HandleErrors;
