import { ObjectId, type Collection, type MongoClient } from "mongodb";
import type { ShortcutRepo, UrlShortcut } from "../types";

export class MongoShortcutRepo implements ShortcutRepo {
  private readonly collection = "shortcuts";
  private shortcutCollection: Collection;

  constructor(private readonly mongoClient: MongoClient) {
    this.shortcutCollection = this.mongoClient.db("shortcuts").collection(this.collection);
  }

  async create(shortcut: Pick<UrlShortcut, "url" | "shortcut">): Promise<UrlShortcut> {
    const result = await this.shortcutCollection.insertOne({
      ...shortcut,
      url: shortcut.url.toString(),
    });

    return {
      id: result.insertedId.toHexString(),
      shortcut: shortcut.shortcut,
      url: shortcut.url,
    };
  }

  async getBy(query: { shortcut?: string; id?: string }): Promise<UrlShortcut | null> {
    const result = await this.shortcutCollection.findOne(
      {
        ...query,
      },
      {
        projection: {
          _id: 1,
          url: 1,
          shortcut: 1,
        },
      },
    );

    if (!result) {
      return null;
    }

    return {
      id: result._id.toHexString(),
      shortcut: result.shortcut,
      url: result.url,
    };
  }

  async getAll(): Promise<UrlShortcut[]> {
    const result = await this.shortcutCollection
      .find(
        {},
        {
          projection: {
            _id: 1,
            url: 1,
            shortcut: 1,
          },
        },
      )
      .toArray();

    return result.map((shortcut) => ({
      id: shortcut._id.toHexString(),
      shortcut: shortcut.shortcut,
      url: shortcut.url,
    }));
  }

  async delete(id: string): Promise<void> {
    await this.shortcutCollection.deleteOne({ _id: new ObjectId(id) });
  }
}
