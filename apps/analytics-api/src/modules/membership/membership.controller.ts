import { Request, Response, NextFunction } from "express";
import {
  addMember,
  getOrganizationMembers,
  removeMember,
  updateMemberRole,
} from "./membership.service";

export const getMembersController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const members = await getOrganizationMembers(id);

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

export const addMemberController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    const member = await addMember(id, userId, role);

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMemberRoleController = async (
  req: Request<{ id: string; userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, userId } = req.params;
    const { role } = req.body;

    const member = await updateMemberRole(id, userId, role);

    res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMemberController = async (
  req: Request<{ id: string; userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, userId } = req.params;

    await removeMember(id, userId);

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    next(error);
  }
};
