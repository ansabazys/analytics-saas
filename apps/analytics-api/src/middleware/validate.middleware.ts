import { Request, Response, NextFunction } from "express"
import { ZodType } from "zod"
import { BadRequestError } from "../errors/BadRequestError"

export const validate =
  (schema: ZodType, property: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property])

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ")

      throw new BadRequestError(message)
    }

    req[property] = result.data
    next()
  }