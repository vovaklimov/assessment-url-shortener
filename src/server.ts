import Fastify, { type FastifyServerOptions } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

export async function bootstrap(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(import("./plugins/config-plugin"));
  app.register(import("./plugins/mongodb-plugin"));

  app.register(import("./modules/root-routes"));

  return app;
}
