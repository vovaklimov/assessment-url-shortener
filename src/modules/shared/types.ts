export interface UrlShortcut {
  id: string;
  url: URL;
  shortcut: string;
}

export interface ShortcutRepo {
  create(shortcut: Pick<UrlShortcut, "url" | "shortcut">): Promise<UrlShortcut>;
  getBy(query: { shortcut?: string; id?: string }): Promise<UrlShortcut | null>;
  getAll(): Promise<UrlShortcut[]>;
  delete(id: string): Promise<void>;
}
