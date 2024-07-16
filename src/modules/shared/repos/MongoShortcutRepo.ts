import { ObjectId, type Collection, type MongoClient } from "mongodb";
import type { ShortcutRepo, UrlShortcut } from "../types";

export class MongoShortcutRepo implements ShortcutRepo {
  private readonly collectionName = "shortcuts";
  private shortcutCollection: Collection<Omit<UrlShortcut, "id">>;

  constructor(private readonly mongoClient: MongoClient) {
    this.shortcutCollection = this.mongoClient.db("shortcuts").collection(this.collectionName);
  }

  async create(shortcut: Pick<UrlShortcut, "originalUrl" | "alias">): Promise<UrlShortcut> {
    const result = await this.shortcutCollection.insertOne(shortcut);

    return {
      id: result.insertedId.toHexString(),
      alias: shortcut.alias,
      originalUrl: shortcut.originalUrl,
    };
  }

  async getBy({ id, ...query }: { alias?: string; id?: string }): Promise<UrlShortcut | null> {
    const result = await this.shortcutCollection.findOne({
      ...(id ? { _id: new ObjectId(id) } : {}),
      ...query,
    });

    if (!result) {
      return null;
    }

    return {
      id: result._id.toHexString(),
      alias: result.alias,
      originalUrl: result.originalUrl,
    };
  }

  async getAll(): Promise<UrlShortcut[]> {
    const result = await this.shortcutCollection.find().toArray();
    return result.map((shortcut) => ({
      id: shortcut._id.toHexString(),
      alias: shortcut.alias,
      originalUrl: shortcut.originalUrl,
    }));
  }

  async delete(id: string): Promise<void> {
    await this.shortcutCollection.deleteOne({ _id: new ObjectId(id) });
  }
}
