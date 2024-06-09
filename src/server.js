import Fastify from "fastify";
import { urlShortcutsRoutes } from "./modules/url-shortcuts/url-shortcuts-routes.js";
import { redirectsRoutes } from "./modules/redirects/redirects-routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(urlShortcutsRoutes, { prefix: "/shortcuts" });
fastify.register(redirectsRoutes);

export async function start({ port }) {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
