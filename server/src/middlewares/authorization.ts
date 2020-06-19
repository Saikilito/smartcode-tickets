import { Request, Response, NextFunction } from "express";
import { jToken } from "../helpers";
import { JWTFailed } from "../errors";
/**
 * @description verify a valid json web token or response 403 and verify a admin requiered
 */
const authorization = (isAdmin: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string | boolean = req.headers["authorization"] || false;

      if (!token) {
        return res.status(403).json({ ok: false, message: "Unauthorization" });
      }

      const decode: JWToken = jToken.verifyToken(token) as JWToken;

      if (!decode) {
        return res.status(403).json({ ok: false, message: "Unauthorization" });
      }
      if (isAdmin && decode.rol !== "admin") {
        return res.status(403).json({ ok: false, message: "Unauthorization" });
      }
      if (!isAdmin && decode.rol !== "user" && decode.rol !== "admin") {
        return res.status(403).json({ ok: false, message: "Unauthorization" });
      }

      next();
    } catch (error) {
      throw new JWTFailed(error);
    }
  };
};

type JWToken = {
  id: number;
  rol: string;
  iat: number;
  exp: number;
};

export default authorization;
