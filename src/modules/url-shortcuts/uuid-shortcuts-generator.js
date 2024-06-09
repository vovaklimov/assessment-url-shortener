import { randomUUID } from "node:crypto";
import { uuidToBase62 } from "../../utils.js";

export function uuidShortcutsGenerator(_url) {
  const uuid = randomUUID();
  return uuidToBase62(uuid).slice(0, 7);
}
