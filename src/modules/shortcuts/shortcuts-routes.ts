import { createShortcutSchema, deleteShortcutSchema } from "./shortcuts-schemas";
import { createShortcut } from "./use-cases/create-shortcut";
import { MongoShortcutRepo } from "../shared/repos/MongoShortcutRepo";
import { getAllShortcuts } from "./use-cases/get-all-shortcuts";
import { deleteShortcut } from "./use-cases/delete-shortcut";
import type { FastifyZod } from "../shared/types";

export async function shortcutsRoutes(app: FastifyZod) {
  const shortcutRepo = new MongoShortcutRepo(app.mongo.client);
  app.get("/", async () => {
    return getAllShortcuts({ shortcutRepo, rootUrl: app.config.MY_URL });
  });

  app.post(
    "/",
    {
      schema: {
        body: createShortcutSchema,
      },
    },
    async (req) => {
      return createShortcut({ url: req.body.url, rootUrl: app.config.MY_URL, shortcutRepo });
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        params: deleteShortcutSchema,
      },
    },
    async (req) => {
      return deleteShortcut({ id: req.params.id, shortcutRepo });
    },
  );
}

export default shortcutsRoutes;
