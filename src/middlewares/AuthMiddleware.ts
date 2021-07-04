// This is a custom Middleware.  Can also be use to validate if username and passwor is empty
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction): Response | void => {
    // check if authorization header is filled
    if(!req.headers.authorization){
        return res.status(401).json({
            success: false,
            message: "User is not Authenticated"
        })
    }
    const secretKey:string = process.env.JWT_SECRET_KEY || "secret"
    const token:string = req.headers.authorization.split(" ")[1]

    try {
        // verify token
        const credentials: string | object = jwt.verify(token, secretKey)
        console.log(credentials)
        if(credentials) {
            req.app.locals.credentials = credentials
            return next()
        } 
        return res.status(422).json({
            success: false,
            message: "Token is invalid"
        })
    } catch(err){
        return res.status(500).json({
            success: false.valueOf,
            message: err
        })
    }
}