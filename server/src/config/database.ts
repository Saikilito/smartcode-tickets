import { createConnection } from "typeorm";
import path from "path";

class TypeORM {
  static init = async () => {
    try {
      await createConnection({
        type: "mysql",
        host: process.env.HOST_DB || "localhost",
        port: parseInt(`${process.env.PORT_DB}`) || 3306,
        username: process.env.USERNAME_DB || "your_database_username",
        password: process.env.PASSWORD_DB || "your_database_password",
        database: process.env.DB_NAME || "your_database_name",
        synchronize: true,
        entities: [path.join(__dirname, "../entity/**/*.ts")],
      });
      console.info(`Database connected successfully`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default TypeORM;
