import type { FastifyInstance } from "fastify";
import { createShortcutSchema, deleteShortcutSchema } from "./shortcuts-schemas";
import { createShortcut } from "./use-cases/create-shortcut";
import { MongoShortcutRepo } from "../shared/repos/MongoShortcutRepo";
import { getAllShortcuts } from "./use-cases/get-all-shortcuts";
import { deleteShortcut } from "./use-cases/delete-shortcut";

export async function shortcutsRoutes(app: FastifyInstance) {
  const shortcutRepo = new MongoShortcutRepo(app.mongo.client);

  app.get("/", async () => {
    return getAllShortcuts({ shortcutRepo });
  });

  app.get("/:id", async () => {
    return "id";
  });

  app.post("/", async (req) => {
    const body = await createShortcutSchema.parseAsync(req.body);
    return createShortcut({ url: body.url, shortcutRepo });
  });

  app.delete("/:id", async (req) => {
    const params = await deleteShortcutSchema.parseAsync(req.params);
    return deleteShortcut({ id: params.id, shortcutRepo });
  });
}

export default shortcutsRoutes;
