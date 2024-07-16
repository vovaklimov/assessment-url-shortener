import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export interface UrlShortcut {
  id: string;
  originalUrl: string;
  alias: string;
}

export interface ShortcutRepo {
  create(shortcut: Pick<UrlShortcut, "originalUrl" | "alias">): Promise<UrlShortcut>;
  getBy(query: { shortcut?: string; id?: string }): Promise<UrlShortcut | null>;
  getAll(): Promise<UrlShortcut[]>;
  delete(id: string): Promise<void>;
}
