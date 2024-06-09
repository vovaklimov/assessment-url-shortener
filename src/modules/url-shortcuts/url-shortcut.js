export class UrlShortcut {
  #shortcut;
  #url;

  get url() {
    return this.#url;
  }

  get shortcut() {
    return this.#shortcut.value;
  }

  constructor(url, shortcut) {
    this.#url = new URL(url);
    this.#shortcut = new Shortcut(shortcut);
  }
}

export class Shortcut {
  static #length = 7;

  #value;

  get value() {
    return this.#value;
  }

  constructor(value) {
    if (!Shortcut.isValid(value)) {
      throw new Error("Invalid shortcut");
    }

    this.#value = value;
  }

  static isValid(value) {
    return value.length === Shortcut.#length && /^[0-9A-Za-z]+$/.test(value);
  }
}
