import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const mongodbPlugin = fp(
  async (app: FastifyInstance) => {
    app
      .register(import("@fastify/mongodb"), {
        forceClose: true,
        url: app.config.MONGODB_CONNECTION_STRING,
      })
      .after(() => {
        app.log.info("Connected to MongoDB");
      });
  },
  {
    dependencies: ["configPlugin"],
  },
);

export default mongodbPlugin;
