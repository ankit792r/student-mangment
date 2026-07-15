import { type FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import type { DependencyOverrides } from "../app";
import type { Collection } from "mongodb";
import { UserCollectionConfig, type User } from "../../schemas/user.schema";
import { createCollection } from "../../schemas/collection";
import { StudentCollectionConfig, type Student } from "../../schemas/student.schema";

export default fp(
  async (fastify: FastifyInstance, overrides: DependencyOverrides) => {
    fastify.log.info("plugging: COLL into app");

    const userCollection =
      overrides.userCollection ??
      (await createCollection<User>(UserCollectionConfig, fastify.mongoClient));


    const studentCollection =
      overrides.studentCollection ??
      (await createCollection<Student>(StudentCollectionConfig, fastify.mongoClient));

    fastify.decorate("userCollection", userCollection);
    fastify.decorate("studentCollection", studentCollection);
  },
  { name: "collection", dependencies: ["db"] },
);

declare module "fastify" {
  interface FastifyInstance {
    studentCollection: Collection<Student>;
    userCollection: Collection<User>;
  }
}
