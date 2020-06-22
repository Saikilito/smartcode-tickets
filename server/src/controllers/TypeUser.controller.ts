import { Request, Response, NextFunction, response } from "express";
import { UserTypes as UserTypeEntity } from "../entity";
import { Users as UsersEntity } from "../entity";
import { getRepository } from "typeorm";
import { validation } from "../helpers";
import CRUD from "./CRUD";

import { ValidationFailed } from "../errors";

class TypeUsers extends CRUD {
  constructor() {
    super(UserTypeEntity, "ticket");
  }

  public createTypeUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.userType.createUserType(req.body);

      if (error) {
        throw new ValidationFailed(error);
      }

      const typeFound = await getRepository(UserTypeEntity).findOne({ nombre: req.body.nombre });

      if (typeFound) {
        return res.status(404).json({
          ok: false,
          message: `Type User alredy exist`,
        });
      }

      const response = await this.create(req, res);

      return res.json({
        ok: true,
        response,
        message: `Type User created successfully`,
      });
    } catch (error) {
      next(error);
    }
  };
}

const typeUser = new TypeUsers();

export default typeUser;
