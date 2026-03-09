import { Request, Response } from "express";
import { AppError, ValidationError } from "../../../../shared/errors";
import { UserMapper } from "../../../user/mapper/userMapper";
import { registerSchema } from "../../schema/authSchema";
import { RegisterUseCase } from "../../useCases/registerUseCase";

export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new ValidationError(parsed.error.issues);
      }

      const user = await this.registerUseCase.execute(parsed.data);
      return res.status(201).json({
        message: "User registered successfully",
        data: UserMapper.toDTO(user),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message, errors: error.issues });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to register user", error: message });
    }
  }
}
