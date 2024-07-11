import type { FastifyInstance } from "fastify";

export async function redirectsRoutes(fastify: FastifyInstance) {
  fastify.get("/:shortcut", async () => {});
}

export default redirectsRoutes;
