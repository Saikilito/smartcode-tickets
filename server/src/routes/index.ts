import { Router, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HandleErrors } from "../middlewares";
import user_routes from "./user.route";
import ticket_routes from "./ticket.route";

const api = Router();

api.get("/api/v1/ping", (req: Request, res: Response) => res.json({ ok: true, msg: "pong" }));
api.use("/api/v1/user", user_routes);
api.use("/api/v1/ticket", ticket_routes);

api.use(HandleErrors.handleErrorTypes);

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

export default api;
