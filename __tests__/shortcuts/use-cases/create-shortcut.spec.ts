import { MongoClient } from "mongodb";
import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { bootstrap } from "../../../src/server";

describe("Create shortcut", () => {
  let container: StartedTestContainer;
  let mongoClient: MongoClient;
  let app: FastifyInstance;

  beforeAll(async () => {
    container = await new GenericContainer("mongodb/mongodb-community-server:7.0.12-ubi8")
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: "root",
        MONGO_INITDB_ROOT_PASSWORD: "root",
      })
      .withWaitStrategy(Wait.forListeningPorts())
      .start();

    mongoClient = new MongoClient(
      `mongodb://root:root@${container.getHost()}:${container.getMappedPort(27017)}`,
    );

    vi.stubEnv("PORT", "3000");
    vi.stubEnv("MY_URL", "http://localhost:3000");
    vi.stubEnv(
      "MONGODB_CONNECTION_STRING",
      `mongodb://root:root@${container.getHost()}:${container.getMappedPort(27017)}`,
    );

    app = await bootstrap();
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
