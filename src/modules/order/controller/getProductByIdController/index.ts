import { Request, Response } from "express";
import { findProductById } from "../../data/products";

export class GetProductByIdController {
  handle(req: Request, res: Response): Response {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = findProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  }
}
