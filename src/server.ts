import { app } from "./app";
import { env } from "./env";

async () => {
  try {
    await app
      .listen({
        host: "0.0.0.0",
        port: 3333,
      })
      .then(() => {
        console.log("🚀 HTTP Server Running!");
      });

    app.swagger();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
