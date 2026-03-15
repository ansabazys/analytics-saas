import { Request, Response } from "express";
import { createWebsite, deleteWebsite, getWebsiteById, getWebsites, regenerateWebsiteKeys, updateWebsite } from "../services/website.service";

export const createWebsiteController = async (req: Request, res: Response) => {
  try {
    const { name, domain, organizationId } = req.body;

    const website = await createWebsite(organizationId, name, domain);

    res.status(201).json({
      message: "Website created successfully",
      data: website,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create website",
      error,
    });
  }
};

export const getWebsitesController = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.query;

    const websites = await getWebsites(organizationId as string);

    res.status(200).json({
      data: websites,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch websites",
      error,
    });
  }
};

export const getWebsiteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const website = await getWebsiteById(id as string);

    if (!website) {
      return res.status(404).json({
        message: "Website not found",
      });
    }

    res.status(200).json({
      data: website,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch website",
      error,
    });
  }
};

export const updateWebsiteController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, domain } = req.body;

    const website = await updateWebsite(id, { name, domain });

    res.status(200).json({
      message: "Website updated successfully",
      data: website,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update website",
      error,
    });
  }
};

export const deleteWebsiteController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteWebsite(id);

    res.status(200).json({
      message: "Website deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete website",
      error,
    });
  }
};

export const regenerateWebsiteKeysController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const website = await regenerateWebsiteKeys(id);

    res.status(200).json({
      message: "API keys regenerated successfully",
      data: website,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to regenerate API keys",
      error,
    });
  }
};