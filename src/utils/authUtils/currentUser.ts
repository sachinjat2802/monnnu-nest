
import { HttpException } from "@nestjs/common";
import { NextFunction } from "express";
import jwtVerify from "./jwtVerify";

export const verifyTokenClient = (
    req:any,
    res,
    next:NextFunction
) => {
    if (!req.headers.authorization) {
        next(new HttpException("No User Logged In!",401));
    } else {
        try {
            jwtVerify.verfyJwtClient(req.headers.authorization, (err: any, payload: any) => {
                if (payload) {
                    req.currentUser = payload;
                    next();
                } else {
                    next(new HttpException( "Not Authorized!",401));
                }
            });
        }
        catch (err: any) {
            next(new HttpException("Not Authorized!",401));
        }
    }
};


export const verifyTokenAdmin = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        next(new HttpException("No User Logged In!",401));
    } else {
        try {
            jwtVerify.verfyJwtAdmin(req.headers.authorization, (err: any, payload: any) => {
                if (payload) {
                    req.currentUser = payload;
                    next();
                } else {
                    next(new HttpException("Not Authorized!",401));
                }
            });
        }
        catch (err: any) {
            next(new HttpException("Not Authorized!",401));
        }
    }

};