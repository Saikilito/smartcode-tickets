import { Request, Response, NextFunction, response } from "express";
import { Users as UserEntity } from "../entity";
import { UserTypes as UserTypesEntity } from "../entity";
import { getRepository } from "typeorm";
import { validation } from "../helpers";
import CRUD from "./CRUD";
import bcrypt from "bcryptjs";
import { jToken } from "../helpers/";

import { ValidationFailed } from "../errors";

class UserController extends CRUD {
  constructor() {
    super(UserEntity, "user");
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.user.createUser(req.body);

      if (error) {
        throw new ValidationFailed(error);
      }

      const { rol, id } = req.body;

      const idRol = await getRepository(UserTypesEntity).findOne({ nombre: rol });
      req.body.id_tipouser = idRol ? idRol.id : 0;

      const response = await this.create(req, res);

      const t_jwt = jToken.createToken({ id, rol });

      if (!t_jwt) {
        throw new Error("Server Error");
      }

      return res.json({
        ok: true,
        user: response,
        token: t_jwt,
        message: `User created successfully`,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.user.updateUser(req.body);

      if (error) {
        return res.status(400).json({
          ok: false,
          error: error.message,
        });
      }

      const { rol } = req.body;

      if (rol) {
        const idRol = await getRepository(UserTypesEntity).findOne({ nombre: rol });

        req.body.id_tipouser = idRol ? idRol : 0;
      }

      const response = await this.update(req, res);

      if (!response) {
        return res.status(404).json({
          ok: false,
          error: `User not found`,
        });
      }

      return res.json({
        ok: true,
        response,
        message: `User updated succesfull`,
      });
    } catch (error) {
      next(error);
    }
  };

  public signinUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.user.signinUser(req.body);

      if (error) {
        throw new ValidationFailed(error);
      }

      const userFound = await getRepository(UserEntity).findOne({ mail: req.body.mail });

      if (!userFound) {
        return res.status(404).json({
          ok: false,
          message: `User or password do not match`,
        });
      }

      const password = userFound ? userFound.pass : "";

      const compare = bcrypt.compareSync(req.body.pass, password);

      if (!compare) {
        return res.status(404).json({
          ok: false,
          message: `User or password do not match`,
        });
      }

      const userPayload = {
        id: userFound ? userFound.id : 0,
        nombre: userFound ? userFound.nombre : "",
        mail: userFound ? userFound.mail : "",
        rol: userFound ? userFound.id_tipouser.nombre : "",
      };

      const t_jwt = jToken.createToken(userPayload);
      if (!t_jwt) {
        throw new Error("Server Error");
      }

      res.json({
        ok: true,
        message: `User signing successfully`,
        token: t_jwt,
        user: userFound,
      });
    } catch (error) {
      next(error);
    }
  };
}

type UserConnect = {
  username: string;
  password: string;
};

const user = new UserController();

export default user;
