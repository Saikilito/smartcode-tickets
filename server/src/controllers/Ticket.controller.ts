import { Request, Response, NextFunction, response } from "express";
import { Tickets as TicketEntity } from "../entity";
import { Users as UsersEntity } from "../entity";
import { getRepository } from "typeorm";
import { validation } from "../helpers";
import CRUD from "./CRUD";

import { ValidationFailed } from "../errors";

class TicketController extends CRUD {
  constructor() {
    super(TicketEntity, "ticket");
  }

  public createTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.ticket.createTicket(req.body);

      if (error) {
        throw new ValidationFailed(error);
      }

      const userFound = await getRepository(UsersEntity).findOne({ id: req.body.id_user });

      if (!userFound) {
        return res.status(404).json({
          ok: false,
          message: `User id not found`,
        });
      }

      const response = await this.create(req, res);

      return res.json({
        ok: true,
        response,
        message: `ticket created successfully`,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error } = validation.ticket.updateTicket(req.body);

      if (error) {
        throw new ValidationFailed(error);
      }

      if (req.body.id_user) {
        const userFound = await getRepository(UsersEntity).findOne({ id: req.body.id_user });
        req.body.id_user = userFound;
        if (!userFound) {
          return res.status(404).json({
            ok: false,
            message: `User id not found`,
          });
        }
      }

      const response = await this.update(req, res);

      if (!response) {
        return res.status(404).json({
          ok: false,
          error: `ticket not found`,
        });
      }

      return res.json({
        ok: true,
        response,
        message: `ticket updated succesfull`,
      });
    } catch (error) {
      next(error);
    }
  };

  public acceptAssignTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      req.body.id = req.params.id;
      req.body.id_user = req.params.userId;
      const { error } = validation.ticket.updateTicket(req.body);

      if (error) {
        return res.status(400).json({
          ok: false,
          error: error.message,
        });
      }

      const userFound = await getRepository(UsersEntity).findOne({ id: req.body.id_user });

      if (!userFound) {
        return res.status(404).json({
          ok: false,
          message: `User id not found`,
        });
      }

      const response = await this.update(req, res);

      if (!response) {
        return res.status(404).json({
          ok: false,
          error: `ticket not found`,
        });
      }

      return res.json({
        ok: true,
        body: response,
        message: `ticket updated succesfull`,
      });
    } catch (error) {
      next(error);
    }
  };

  public getTicketsOfUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const idUser = parseInt(req.params.id);
      const response = await getRepository(TicketEntity).find({ id_user: { id: idUser } });

      return res.json({
        ok: true,
        response,
      });
    } catch (error) {
      next(error);
    }
  };
}

const ticket = new TicketController();

export default ticket;
