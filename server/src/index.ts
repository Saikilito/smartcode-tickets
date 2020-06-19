import "reflect-metadata";
import { App } from "./config";

export const main = async () => {
  const app = new App();
  await app.listen(4000);
};

main();
