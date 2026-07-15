import type { Pool } from "pg";
import type { UserRepositoryInterface } from "../../schemas/user/user.interface";
import type { User, UserId } from "../../schemas/user/user.schema";

export class PgUserRepository implements UserRepositoryInterface {

  constructor(
    private readonly db: Pool,
  ) { }
  create(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: UserId): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  existsByEmail(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  existsByUsername(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updatePartial(id: UserId, updates: Partial<User>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: UserId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
