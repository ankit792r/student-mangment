import type { FastifyInstance } from "fastify";
import { join } from "path";
import type { AppPluginOptions } from "./server";
import autoload from "@fastify/autoload";
import { errorHandler, notFoundHandler } from "./errors/handlers";
import type { RedisClientType } from "redis";
import type { Collection, MongoClient } from "mongodb";
import type { ICache } from "../modules/cache/cache-interface";
import type { UserService } from "../service/user/user.service";
import type { AuthService } from "../service/auth/auth.service";
import type { UserRepositoryInterface } from "../schemas/user/user.interface";
import type { StudentRepositoryInterface } from "../schemas/student/student.interface";
import type { StudentService } from "../service/student/student.service";
import type { Student } from "../schemas/student.schema";
import type { User } from "../schemas/user.schema";

export type DependencyOverrides = {
  mongoClient?: MongoClient;

  redisClient?: RedisClientType;
  defaultCache?: ICache;

  userRepository?: UserRepositoryInterface;
  studentRepository?: StudentRepositoryInterface;

  userCollection?: Collection<User>;
  studentCollection?: Collection<Student>

  userService?: UserService;
  authService?: AuthService;
  studentService?: StudentService;
};

export async function app(fastify: FastifyInstance, opts?: AppPluginOptions) {
  fastify.setErrorHandler(errorHandler);
  fastify.setNotFoundHandler(notFoundHandler);

  fastify.register(autoload, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });


  fastify.log.info("plugging: ROUTES into app");
  fastify.register(autoload, {
    dir: join(__dirname, "routes"),
    prefix: opts?.appOptions?.apiPrefix,
  });
}
