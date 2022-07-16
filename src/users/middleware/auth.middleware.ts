import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { UsersService } from "../users.service";

@Injectable()
export class AuthenticationMiddleWare implements NestMiddleware {
    constructor(private readonly service : UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        let token = req.header('Authorization')
        
        if (!token || token === null || token === undefined || token === "undefined") {
            return res.status(403).send("please login!")
        }
        token = token.replace('Bearer ', '')

        const data = await jwt.verify(token, process.env.SECRET_CODE_JWT)
        const user = await this.service.getUser(data.id)

        if (!user) {
            throw new BadRequestException("invalid_token");
        }
        return next()
    }
}