import type { FastifyInstance } from "fastify";

export async function rootRoutes(app: FastifyInstance) {
  app.register(import("./shortcuts/shortcuts-routes"), { prefix: "/api/shortcuts" });
  app.register(import("./redirects/redirects-routes"));
}

export default rootRoutes;
