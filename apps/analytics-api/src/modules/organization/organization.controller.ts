import { Request, Response, NextFunction } from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from "./organization.service";
import { slugify } from "../../utils/slugify";
import { NotFoundError } from "../../errors";

export const createOrganizationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, ownerId } = req.body;

    const slug = slugify(name);

    const org = await createOrganization(name, slug, ownerId);

    res.status(201).json({
      success: true,
      message: "Organization created",
      data: org,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizationsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;

    const organizations = await getOrganizations(userId as string);

    res.status(200).json({
      success: true,
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizationController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const org = await getOrganizationById(id);

    if (!org) {
      throw new NotFoundError("Organization not found");
    }

    res.status(200).json({
      success: true,
      data: org,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrganizationController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const slug = name ? slugify(name) : undefined;

    const org = await updateOrganization(id, {
      name,
      slug,
    });

    res.status(200).json({
      success: true,
      message: "Organization updated successfully",
      data: org,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrganizationController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await deleteOrganization(id);

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
