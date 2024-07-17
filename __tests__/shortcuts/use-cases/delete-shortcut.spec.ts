import { MongoClient } from "mongodb";
import { StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { setup } from "../../utils/setup";

describe("Delete shortcut", () => {
  let container: StartedTestContainer;
  let mongoClient: MongoClient;
  let app: FastifyInstance;

  beforeAll(async () => {
    const setupResult = await setup();
    container = setupResult.container;
    mongoClient = setupResult.mongoClient;
    app = setupResult.app;
  });

  afterAll(async () => {
    await app.close();
    await mongoClient.close();
    await container.stop();
    vi.unstubAllEnvs();
  });

  afterEach(async () => {
    await mongoClient.db("test").collection("shortcuts").deleteMany({});
  });

  it("should delete existing shortcut by id", async () => {
    const url = "https://google.com";

    const createShortcutResponse = await app.inject().post("/api/shortcuts").body({ url }).end();
    const { id } = createShortcutResponse.json();

    const deleteShortcutResponse = await app.inject().delete(`/api/shortcuts/${id}`).end();
    expect(deleteShortcutResponse.statusCode).toBe(200);

    expect(await mongoClient.db("test").collection("shortcuts").findOne({ id })).toBeNull();
  });
});
