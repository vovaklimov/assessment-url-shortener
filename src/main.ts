import config from "./config";
import { bootstrap } from "./server";

const app = await bootstrap({
  logger: true,
});

try {
  await app.listen({ port: config.PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
