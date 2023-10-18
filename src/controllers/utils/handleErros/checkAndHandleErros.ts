import { NextFunction } from "express";
import ServiceError from "../../../services/utils/serviceError";
import handleServiceErrors from "./handleServiceErrors";

export const checkAndHandleErrors = (error: any, next: NextFunction) => {
  if (error instanceof ServiceError) handleServiceErrors(error);

  next(error);
};
