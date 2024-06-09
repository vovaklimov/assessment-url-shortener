import { UrlShortcut } from "./url-shortcut.js";
import { uuidShortcutsGenerator } from "./uuid-shortcuts-generator.js";

export async function urlShortcutsRoutes(fastify, _options) {
  fastify.post("/", async (request, reply) => {
    const { url } = request.body;
    const urlShortcut = new UrlShortcut(uuidShortcutsGenerator(url));

    reply.send({
      url: urlShortcut.url,
      shortcut: urlShortcut.shortcut,
    });
  });

  fastify.get("/", async (request, reply) => {
    reply.send("Not implemented yet");
  });

  fastify.get("/:shortcut", async (request, reply) => {
    reply.send("Not implemented yet");
  });
}

export default urlShortcutsRoutes;
