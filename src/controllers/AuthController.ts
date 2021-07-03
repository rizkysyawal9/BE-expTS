import { NextFunction, Request, Response } from 'express'
import Authentication from '../utils/Authentication'
const db = require('../db/models')

class AuthController{
    register = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body
        // find if username exist in db
        const user = await db.user.findOne({
            where: {username: username}
        })
        if(user){
            return res.status(422).json({
                success: false,
                message: "Username already exists"
            })
        }
        const hashedPassword:string = await Authentication.passwordHash(password)
        const createdUser = await db.user.create({
            username: username,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "User successfully Created",
        })
    }
    login = async (req: Request, res: Response):Promise<Response> => {
        // find user by username
        const { username, password } = req.body
        const user = await db.user.findOne({
            where: {username: username}
        })
        if(user){
            // check if password matched
            const validPassword = await Authentication.passwordCompare(password, user.password)
            if(validPassword){
                // generate token
                const token = Authentication.generateTokens(user.id, user.username, user.password)
                return res.status(200).json({
                    success: true,
                    message: "Token generated",
                    data: token
                })
            } 
        } 
        return res.status(404).json({
            success: false, 
            message: "User not found"
        })
    }
    profile = (req: Request, res: Response, next: NextFunction) => {
        let parsedToken:object = req.app.locals.credentials
        return res.status(200).json({
            success: true, 
            message: "User Found",
            data: parsedToken
        })
    } 
}

export default new AuthController()