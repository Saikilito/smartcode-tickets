import { Router } from "express";
import { UserController as User } from "../controllers";
import { authorization } from "../middlewares";

const user_routes = Router();
const isAdmin: boolean = true;

user_routes.post("/signin", User.signinUser);

user_routes.post("/add", User.createUser);

user_routes.get("/all", authorization(!isAdmin), User.getAll);

user_routes.get("/:id", authorization(!isAdmin), User.getOne);

user_routes.put("/update/:id", authorization(isAdmin), User.updateUser);

user_routes.delete("/delete/:id", authorization(isAdmin), User.delete);

export default user_routes;
