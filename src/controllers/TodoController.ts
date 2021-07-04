import ControllerInterface from "./ControllerInterface";
import { Request, Response } from 'express'
import TodoService from "../services/TodoService";

class TodoController implements ControllerInterface{
    index = async (req:Request, res:Response): Promise<Response> =>{
        try {
            const service:TodoService = new TodoService(req)
            const todos = await service.getAllTodos()
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
            const service:TodoService = new TodoService(req)
            const todo = await service.createTodo()
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
            const service:TodoService = new TodoService(req)
            const todo = await service.getTodo()
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
            const service:TodoService = new TodoService(req)
            const todo = await service.updateTodo()
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
            const service:TodoService = new TodoService(req)
            const todo = await service.deleteTodo()
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