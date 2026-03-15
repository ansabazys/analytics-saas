import { Request, Response } from "express";
import { createOrganization } from "../services/organization.service";

export const createOrganizationController = async (req: Request, res: Response) => {
  try {
    const { name, slug, ownerId } = req.body;

    const org = await createOrganization(name, slug, ownerId);

    res.status(201).json({
      message: "Organization created",
      data: org,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create organization",
      error,
    });
  }
};
