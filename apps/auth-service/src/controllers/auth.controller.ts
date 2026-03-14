import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { db } from "@repo/database";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    });

    res.status(201).json({
      message: "User created",
      userId: user.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}