import { Router } from "express";
import { authorization } from "../middlewares";

const ticket_routes = Router();
const isAdmin: boolean = true;

import { TicketController as ticket } from "../controllers";

ticket_routes.get("/all", authorization(isAdmin), ticket.getAll);

ticket_routes.get("/user/:id", authorization(!isAdmin), ticket.getTicketsOfUser);

ticket_routes.get("/:id", authorization(isAdmin), ticket.getOne);

ticket_routes.post("/add", authorization(!isAdmin), ticket.createTicket);

ticket_routes.put("/update/:id", authorization(isAdmin), ticket.updateTicket);

ticket_routes.delete("/delete/:id", authorization(isAdmin), ticket.delete);

export default ticket_routes;
