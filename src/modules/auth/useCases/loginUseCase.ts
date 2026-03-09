import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../../shared/errors";
import { UserRepository } from "../../user/repository/userRepository";
import { LoginDTO } from "../schema/authSchema";

export interface LoginResult {
  token: string;
  expiresIn: string;
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: LoginDTO): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const expiresIn = "1d";
    const token = jwt.sign({ sub: user.id, email: user.email }, secret, {
      expiresIn,
    });

    return { token, expiresIn };
  }
}
