import { Request, Response, NextFunction } from "express";
import * as analyticsService from "./analytics.service";

export const getPageViews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { websiteId } = req.params;

    const data = await analyticsService.getPageViews(websiteId as string);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPageViewsByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { websiteId } = req.params;

    const data = await analyticsService.getPageViewsByPage(websiteId as string);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getUniqueVisitors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { websiteId } = req.params;

    const data = await analyticsService.getUniqueVisitors(websiteId as string);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getTrafficSources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const websiteId = req.params.websiteId as string;

    const data = await analyticsService.getTrafficSources(websiteId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getDevices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const websiteId = req.params.websiteId as string;

    const data = await analyticsService.getDeviceAnalytics(websiteId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getBrowsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const websiteId = req.params.websiteId as string;

    const data = await analyticsService.getBrowserAnalytics(websiteId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const websiteId = req.params.websiteId as string;

    const data = await analyticsService.getCountryAnalytics(websiteId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
