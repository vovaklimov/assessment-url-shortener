import { MongoClient } from "mongodb";
import { StartedTestContainer } from "testcontainers";
import { afterAll, beforeAll, describe, expect, it, vi, afterEach } from "vitest";
import { FastifyInstance } from "fastify";

import { setup } from "../utils/setup";

describe("Redirects", () => {
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

  it("should redirect to the original URL when the alias is found", async () => {
    const url = "https://google.com";

    const createShortcutResponse = await app.inject().post("/api/shortcuts").body({ url }).end();
    const { alias } = createShortcutResponse.json();
    const redirectResponse = await app.inject().get(alias).end();

    expect(redirectResponse.statusCode).toBe(302);
    expect(redirectResponse.headers).toHaveProperty("location", url);
  });

  it("should return a 404 status when the alias is not found", async () => {
    const alias = "not-found";
    const response = await app.inject().get(alias).end();

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ message: "Shortcut not found" });
  });
});
