import { MongoClient } from "mongodb";
import { StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { setup } from "../../utils/setup";

describe("Get all shortcuts", () => {
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

  it("should return all existing shortcuts", async () => {
    const url = "https://google.com";

    await Promise.all([
      await app.inject().post("/api/shortcuts").body({ url }).end(),
      await app.inject().post("/api/shortcuts").body({ url }).end(),
    ]);
    const getAllResponse = await app.inject().get(`/api/shortcuts`).end();

    expect(getAllResponse.statusCode).toBe(200);
    expect(getAllResponse.json()).toHaveLength(2);
    expect(getAllResponse.json()).toHaveProperty("0.id");
    expect(getAllResponse.json()).toHaveProperty("0.originalUrl", url);
    expect(getAllResponse.json()).toHaveProperty("0.alias");
  });
});
