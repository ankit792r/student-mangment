import { type FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import type { DependencyOverrides } from "../app";
import { createMongoClient } from "../../configs/mongo";
import { env } from "../../configs/env";
import { createPostgresPool } from "../../configs/postgres";
import type { MongoClient } from "mongodb";
import type { Pool } from "pg";

export default fp(async (fastify: FastifyInstance, overrides: DependencyOverrides) => {
  fastify.log.info("plugging: DB into app");

  if (env.DEFAULT_DB === "mongodb") {
    fastify.decorate(
      "mongoClient",
      overrides.mongoClient ?? (await createMongoClient()),
    );
  }

  if (env.DEFAULT_DB === "postgres") {
    const pgPool = createPostgresPool();
    // Verify connection
    await pgPool.query("SELECT 1");

    fastify.decorate(
      "postgresPool",
      overrides.postgresPool ?? pgPool,
    );
  }
}, { name: "db", });

declare module "fastify" {
  interface FastifyInstance {
    mongoClient?: MongoClient;
    postgresPool?: Pool;
  }
}
