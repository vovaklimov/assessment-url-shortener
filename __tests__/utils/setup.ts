import { MongoClient } from "mongodb";
import { GenericContainer, Wait } from "testcontainers";
import { vi } from "vitest";
import { bootstrap } from "../../src/server";

export async function setup() {
  const container = await new GenericContainer("mongodb/mongodb-community-server:7.0.12-ubi8")
    .withExposedPorts(27017)
    .withEnvironment({
      MONGO_INITDB_ROOT_USERNAME: "root",
      MONGO_INITDB_ROOT_PASSWORD: "root",
    })
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

  const mongoClient = new MongoClient(
    `mongodb://root:root@${container.getHost()}:${container.getMappedPort(27017)}`,
  );

  vi.stubEnv("PORT", "3000");
  vi.stubEnv("MY_URL", "http://localhost:3000");
  vi.stubEnv(
    "MONGODB_CONNECTION_STRING",
    `mongodb://root:root@${container.getHost()}:${container.getMappedPort(27017)}`,
  );

  const app = await bootstrap();

  return {
    container,
    mongoClient,
    app,
  };
}
