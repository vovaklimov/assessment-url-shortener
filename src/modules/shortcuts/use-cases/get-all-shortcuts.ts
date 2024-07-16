import type { ShortcutRepo } from "../../shared/types";

interface GetAllShortcutsParams {
  rootUrl: string;
  shortcutRepo: ShortcutRepo;
}

export async function getAllShortcuts({ shortcutRepo, rootUrl }: GetAllShortcutsParams) {
  return (await shortcutRepo.getAll()).map((shortcut) => ({
    ...shortcut,
    alias: `${rootUrl}/${shortcut.alias}`,
  }));
}
