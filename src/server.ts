import Fastify from "fastify";
import configPlugin from "./plugins/config-plugin";
import { config } from "./config";

const fastify = Fastify({
  logger: true,
});

fastify.register(configPlugin);
fastify.register(import("./plugins/mongodb-plugin"));

fastify.register(import("./modules/root-routes"));

export async function start() {
  try {
    await fastify.listen({ port: config.PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
