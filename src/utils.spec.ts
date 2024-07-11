import { describe, expect, it } from "vitest";
import { bigintToBase62, base62ToBigint, uuidToBase62, BASE_62_CHARS } from "./utils.js";
import { randomUUID } from "crypto";

describe("bigintToBase62", () => {
  it("should correctly encode a 32bit bigint", () => {
    expect(bigintToBase62(2_147_483_647n)).toBe("2LKcb1");
  });

  it("should correctly encode a 64bit bigint", () => {
    expect(bigintToBase62(3147483647n)).toBe("3R0WHH");
  });

  it("should correctly encode a 128bit bigint", () => {
    const num = BigInt(`0x14cc7598f2a21a587e466b60480fdc28`);
    expect(bigintToBase62(num)).toBe("dFHeVIhugrWMsa4wlXzdQ");
  });
});

describe(base62ToBigint, () => {
  it("should correctly decode a 32bit bigint", () => {
    expect(base62ToBigint("2LKcb1")).toBe(2_147_483_647n);
  });

  it("should correctly decode a 64bit bigint", () => {
    expect(base62ToBigint("3R0WHH")).toBe(3147483647n);
  });

  it("should correctly decode a 128bit bigint", () => {
    const num = BigInt(`0x14cc7598f2a21a587e466b60480fdc28`);
    expect(base62ToBigint("dFHeVIhugrWMsa4wlXzdQ")).toBe(num);
  });
});

describe("uuidToBase62", () => {
  it("should throw for an invalid UUID", () => {
    expect(() => uuidToBase62("invalid-uuid")).toThrow("Invalid UUID");
  });

  it("should produce a base62 string for a valid UUID", () => {
    const uuid = randomUUID();
    const uuidDigits = uuid.replace(/-/g, "");
    const base62 = uuidToBase62(uuid);

    expect(base62.split("").every((char) => BASE_62_CHARS.includes(char))).toBe(true);
    expect(base62).toBe(bigintToBase62(BigInt(`0x${uuidDigits}`)));
  });
});
