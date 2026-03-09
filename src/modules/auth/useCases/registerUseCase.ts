import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { AppError } from "../../../shared/errors";
import { UserEntity } from "../../user/entity/userEntity";
import { UserRepository } from "../../user/repository/userRepository";
import { RegisterDTO } from "../schema/authSchema";

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterDTO): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = UserEntity.create({
      id: randomUUID(),
      email: dto.email,
      password: hashedPassword,
    });

    return this.userRepository.create(user);
  }
}
