import { MongoClient } from "mongodb";
import { StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { setup } from "../../utils/setup";

describe("Create shortcut", () => {
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

  it("should create a shortcut for a given valid URL", async () => {
    const url = "https://google.com";

    const response = await app.inject().post("/api/shortcuts").body({ url }).end();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("originalUrl", url);
    expect(response.json()).toHaveProperty("alias");
    expect(response.json()).toHaveProperty("id");
  });

  it("should return an error when the URL is not valid", async () => {
    const response = await app.inject().post("/api/shortcuts").body({ url: "invalid-url" }).end();

    expect(response.statusCode).toBe(400);
  });

  it("should return different aliases for same URL", async () => {
    const url = "https://google.com";
    const response1 = await app
      .inject()
      .post("/api/shortcuts")
      .body({
        url,
      })
      .end();
    const response2 = await app
      .inject()
      .post("/api/shortcuts")
      .body({
        url,
      })
      .end();

    expect([response1.statusCode, response2.statusCode]).toEqual([200, 200]);
    expect(response1.json()).property("alias").not.equals(response2.json().alias);
    expect(response1.json()).toHaveProperty("originalUrl", url);
    expect(response2.json()).toHaveProperty("originalUrl", url);
  });
});
