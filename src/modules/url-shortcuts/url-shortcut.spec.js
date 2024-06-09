import { describe, expect, it } from "vitest";
import { Shortcut, UrlShortcut } from "./url-shortcut";

describe("UrlShortcut", () => {
  it("should create new instance with valid url and shortcut", () => {
    const urlShortcut = new UrlShortcut("https://example.com", "abc1233");
    expect(urlShortcut).toBeInstanceOf(UrlShortcut);
    expect(urlShortcut.url.toString()).toBe("https://example.com/");
    expect(urlShortcut.shortcut).toBe("abc1233");
  });

  it("should throw on creating a new instance with invalid url", () => {
    expect(() => new UrlShortcut("example.com", "abc1233")).toThrow();
  });

  it("should throw on creating a new instance with invalid shortcut", () => {
    expect(() => new UrlShortcut("https://example.com", "bc1233")).toThrow();
    expect(() => new UrlShortcut("https://example.com", "_12#")).toThrow();
  });
});

describe("Shortcut", () => {
  it("should validate strings correctly", () => {
    expect(Shortcut.isValid("abc1233")).toBe(true);
    expect(Shortcut.isValid("bc1233")).toBe(false);
    expect(Shortcut.isValid("_12#")).toBe(false);
  });

  it("should create a new instance from valid strings", () => {
    const shortcut = new Shortcut("abc1233");
    expect(shortcut).toBeInstanceOf(Shortcut);
    expect(shortcut.value).toBe("abc1233");
  });

  it("should throw on creating a new instance from invalid strings", () => {
    expect(() => new Shortcut("bc1233")).toThrow();
    expect(() => new Shortcut("_12#")).toThrow();
  });
});
