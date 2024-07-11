export const BASE_62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function bigintToBase62(num: number | bigint): string {
  if (["bigint", "number"].includes(typeof num) === false) {
    throw new Error("bigintToBase62 expects a BigInt or number");
  }

  const base = 62n;
  let bigint = BigInt(num);
  let result = "";

  while (bigint > 0) {
    result = BASE_62_CHARS[Number(bigint % base)] + result;
    bigint = bigint / base;
  }

  return result;
}

export function base62ToBigint(str: string): bigint {
  const base = 62n;
  let bigint = BigInt(0);

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === undefined || !BASE_62_CHARS.includes(char)) {
      throw new Error("Invalid base62 character");
    }

    bigint = bigint * base + BigInt(BASE_62_CHARS.indexOf(char));
  }

  return bigint;
}

export function uuidToBase62(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  if (!uuidRegex.test(uuid)) {
    throw new Error("Invalid UUID");
  }

  const uuidDigits = uuid.replace(/-/g, "");
  return bigintToBase62(BigInt(`0x${uuidDigits}`));
}
