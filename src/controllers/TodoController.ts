import ControllerInterface from "./ControllerInterface";
import { Request, Response } from 'express'
const db = require('../db/models')


class TodoController implements ControllerInterface{
    index = async (req:Request, res:Response): Promise<Response> =>{
        try {
            const { id } = req.app.locals.credentials
            const todos = await db.todo.findAll({
                where: {
                    userId: id,
                },
                attributes: ['id', 'description']
            })
            return res.status(200).json({
                success: true,
                data: todos
            })
        } catch(err){
            return res.status(500).json({
                success: true,
                data: err
            })
        }
    }
    create = async (req:Request, res:Response):Promise<Response> =>{
        try {
            const { description } = req.body
            const { id } = req.app.locals.credentials
            const todo = await db.todo.create({
                user_id: id,
                description: description
            })
            return res.status(200).json({
                success: true,
                message: "Data berhasil di input"
            });
        } catch(err){
            return res.status(500).json({
                success: true,
                data: err
            })
        }
    }
    read= async (req:Request, res:Response): Promise<Response> =>{
        try {
            const { id } = req.app.locals.credentials
            let postId = req.params.id
            const todo = await db.todo.findOne({
                where: {
                    id: postId,
                    userId: id
                },
                attributes: ['id', 'description']
            })
           return res.status(200).json({
               success: true, 
               data: todo
           })
        } catch(err){
            return res.status(500).json({
                success: true,
                data: err
            })
        }
    }
    update = async (req:Request, res:Response): Promise<Response> => {
        try {
            const { id } = req.app.locals.credentials
            let postId = req.params.id
            const { description } = req.body
            const todo = await db.todo.update({
                description: description, 
            }, {
                where: {
                    id: postId,
                    userId: id
                }
            })
           return res.status(200).json({
               success: true,
               message: "Todo successfully updated"
           })
        } catch(err){
            return res.status(500).json({
                success: true,
                data: err
            })
        }
    }
    delete = async (req:Request, res:Response): Promise<Response> => {
        try {
            const { id } = req.app.locals.credentials
            let postId = req.params.id
            
            const todo = await db.todo.destroy({
                where: {
                    id: postId, 
                    userId: id
                }
            })
            return res.status(200).json({
                success: true, 
                message: "Todo Successfully deleted"
            })
        } catch(err){
            return res.status(500).json({
                success: true,
                data: err
            })
        }
    }
}
export default new TodoController()