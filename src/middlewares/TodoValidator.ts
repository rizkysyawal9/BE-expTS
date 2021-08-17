import { Request, Response, NextFunction } from 'express'
import { check, ValidationError, validationResult, Result } from 'express-validator'

const todoValidator = [
    check('description').isString(),
    (req: Request, res: Response, next: NextFunction)=> {
        const errors:Result<ValidationError> = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                success: false, 
                message: errors
            })
        }
        return next()
    }
]
export default todoValidator