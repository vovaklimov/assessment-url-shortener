import { describe, expect, it } from "vitest";
import { uuidShortcutsGenerator } from "./uuid-shortcuts-generator";
import { Shortcut } from "./url-shortcut";

describe("uuidShortcutsGenerator", () => {
  it("should generate a valid shortcut", () => {
    const url = "https://example.com";
    const shortcut = uuidShortcutsGenerator(url);
    expect(Shortcut.isValid(shortcut)).toBe(true);
  });
});
