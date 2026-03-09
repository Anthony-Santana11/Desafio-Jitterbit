import prisma from "../../../shared/prismaClient";
import { UserEntity } from "../entity/userEntity";
import { UserRepository } from "./userRepository";

export class PrismaUserRepository implements UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const raw = await prisma.user.findUnique({ where: { email } });
    if (!raw) return null;
    return UserEntity.reconstitute({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const raw = await prisma.user.findUnique({ where: { id } });
    if (!raw) return null;
    return UserEntity.reconstitute({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
    });
  }
}
