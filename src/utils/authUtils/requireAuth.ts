import { HttpException } from "@nestjs/common";
import { Response, NextFunction } from "express";

export const requireAuth = (
    req,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        next(new HttpException( "Not Authorized",401));
    }
    next();
};