import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { config, type Config } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
}

export const configPlugin = fp(
  (app: FastifyInstance, _, done) => {
    app.decorate("config", config).after(() => {
      app.log.info("Config loaded");
    });

    done();
  },
  {
    name: "configPlugin",
  },
);

export default configPlugin;
