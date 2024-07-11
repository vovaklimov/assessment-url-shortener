import type { ShortcutRepo } from "../../shared/types";

interface GetAllShortcutsParams {
  shortcutRepo: ShortcutRepo;
}

export async function getAllShortcuts({ shortcutRepo }: GetAllShortcutsParams) {
  return shortcutRepo.getAll();
}
