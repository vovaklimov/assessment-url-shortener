import { MongoClient } from "mongodb";
import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { bootstrap } from "../../src/server";

describe("Redirects", () => {
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

  it("should redirect to the original URL when the alias is found", async () => {
    const url = "https://google.com";

    const createShortcutResponse = await app.inject().post("/api/shortcuts").body({ url }).end();
    const { alias } = createShortcutResponse.json();
    const redirectResponse = await app.inject().get(alias).end();

    expect(redirectResponse.statusCode).toBe(302);
    expect(redirectResponse.headers).toHaveProperty("location", url);
  });
});
