import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { QueryFailed } from "../errors";

abstract class CRUD {
  private entity: any;
  public entityName: String;

  constructor(Entity: any, entityName: String) {
    this.entity = Entity;
    this.entityName = entityName;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const response = await getRepository(this.entity).find();
      if (!response) {
        return res.status(404).json({
          ok: false,
          message: `${this.entityName}s not found`,
        });
      }

      return res.json({
        ok: true,
        response,
      });
    } catch (error) {
      next(new QueryFailed(error));
    }
  };

  public getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await getRepository(this.entity).findOne(req.params.id);

      if (!response) {
        return res.status(404).json({
          ok: false,
          message: `${this.entityName} not found`,
        });
      }

      return res.json(response);
    } catch (error) {
      throw new QueryFailed(error);
    }
  };

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newDateResponse = getRepository(this.entity).create(req.body);
      const response = await getRepository(this.entity).save(newDateResponse);
      return response;
    } catch (error) {
      throw new QueryFailed(error);
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dataFound: any = await getRepository(this.entity).findOne(req.params.id);

      if (!dataFound) {
        return res.status(404).json({
          ok: false,
          message: `${this.entityName} not found`,
        });
      }

      getRepository(this.entity).merge(dataFound, req.body);
      const response = await getRepository(this.entity).save(dataFound);
      return response;
    } catch (error) {
      throw new QueryFailed(error);
    }
  };

  public delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const response = await getRepository(this.entity).delete(req.params.id);

      if (response.affected === 0) {
        return res.json({
          ok: false,
          message: `${this.entityName} not found`,
        });
      }

      return res.json({
        ok: true,
        message: `${this.entityName} delete successfully`,
      });
    } catch (error) {
      throw new QueryFailed(error);
    }
  };
}

export default CRUD;
