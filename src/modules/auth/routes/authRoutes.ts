import { Router } from "express";
import { PrismaUserRepository } from "../../user/repository/prismaUserRepository";
import { LoginController } from "../controller/loginController";
import { RegisterController } from "../controller/registerController";
import { LoginUseCase } from "../useCases/loginUseCase";
import { RegisterUseCase } from "../useCases/registerUseCase";

const userRepository = new PrismaUserRepository();

const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

const registerController = new RegisterController(registerUseCase);
const loginController = new LoginController(loginUseCase);

const authRouter = Router();

authRouter.post("/auth/register", (req, res) =>
  registerController.handle(req, res)
);
authRouter.post("/auth/login", (req, res) =>
  loginController.handle(req, res)
);

export { authRouter };
