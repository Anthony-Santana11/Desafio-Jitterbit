import { Request, Response } from "express";
import { AppError, ValidationError } from "../../../../shared/errors";
import { loginSchema } from "../../schema/authSchema";
import { LoginUseCase } from "../../useCases/loginUseCase";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new ValidationError(parsed.error.issues);
      }

      const result = await this.loginUseCase.execute(parsed.data);
      return res.status(200).json({
        message: "Login successful",
        token: result.token,
        expiresIn: result.expiresIn,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message, errors: error.issues });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ message: "Failed to login", error: message });
    }
  }
}
