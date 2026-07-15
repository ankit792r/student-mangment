import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import type { DependencyOverrides } from "../app";
import { UserRepository as MongoUserRepo } from "../../modules/mongodb/user.repository";
import type { UserRepositoryInterface } from "../../schemas/user/user.interface";
import { createCollection } from "../../modules/mongodb/collection";
import { UserCollectionConfig, type User } from "../../schemas/user/user.schema";
import { StudentCollectionConfig, type Student } from "../../schemas/student/student.schema";
import type { StudentRepositoryInterface } from "../../schemas/student/student.interface";
import { MongoStudentRepository } from "../../modules/mongodb/student.repository";
import { env } from "../../configs/env";
import { PgStudentRepository } from "../../modules/postgres/student.repository";
import { PgUserRepository } from "../../modules/postgres/user.repository";



export default fp(
  async (fastify: FastifyInstance, overrides: DependencyOverrides) => {
    fastify.log.info("plugging: REPO into app");

    let studentRepository: StudentRepositoryInterface;
    let userRepository: UserRepositoryInterface;

    // const userCollection = await createCollection<User>(UserCollectionConfig, fastify.mongoClient!);
    // const userRepository: UserRepositoryInterface = overrides.userRepository ?? new MongoUserRepo(userCollection);
    //
    // const studentCollection = await createCollection<Student>(StudentCollectionConfig, fastify.mongoClient!);
    // const studentRepository: StudentRepositoryInterface = overrides.studentRepository ?? new MongoStudentRepository(studentCollection);


    // const userRepository: UserRepositoryInterface = 
    //   overrides.userRepository ??
    //   (env.DEFAULT_DB === "mongodb"
    //     ? 
    //       new MongoUserRepo(
    //       await createCollection(UserCollectionConfig, fastify.mongoClient!)
    //     )
    //     : new PgUserRepo(
    //       await createTable(UserTableConfig, fastify.postgresClient!)
    //     ));

    if (overrides.userRepository) {
      userRepository = overrides.userRepository;
    } else if (env.DEFAULT_DB === "mongodb") {
      const userCollection = await createCollection<User>(
        UserCollectionConfig,
        fastify.mongoClient!,
      );
      userRepository = new MongoUserRepo(userCollection);
    } else {
      userRepository = new PgUserRepository(
        fastify.postgresPool!,
      );
    }

    if (overrides.studentRepository) {
      studentRepository = overrides.studentRepository;
    } else if (env.DEFAULT_DB === "mongodb") {
      const studentCollection = await createCollection<Student>(
        StudentCollectionConfig,
        fastify.mongoClient!,
      );


      studentRepository = new MongoStudentRepository(studentCollection);
    } else {
      studentRepository = new PgStudentRepository(
        fastify.postgresPool!,
      );

    }

    fastify.decorate("userRepository", userRepository);
    fastify.decorate("studentRepository", studentRepository);

  },
  { name: "repository", dependencies: ["db"] },
);

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepositoryInterface
    studentRepository: StudentRepositoryInterface
  }
}
