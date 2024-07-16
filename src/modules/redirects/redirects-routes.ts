import { z } from "zod";
import { MongoShortcutRepo } from "../shared/repos/MongoShortcutRepo";
import type { FastifyZod } from "../shared/types";

export async function redirectsRoutes(app: FastifyZod) {
  const shortcutRepo = new MongoShortcutRepo(app.mongo.client);

  app.get(
    "/:alias",
    {
      schema: {
        params: z.object({
          alias: z.string(),
        }),
      },
    },
    async (req, reply) => {
      const shortcut = await shortcutRepo.getBy({ alias: req.params.alias });
      if (!shortcut) {
        reply.status(404);
        return { message: "Shortcut not found" };
      }

      return reply.redirect(shortcut.originalUrl);
    },
  );
}

export default redirectsRoutes;
