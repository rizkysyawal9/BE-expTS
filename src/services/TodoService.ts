import { Request } from 'express'
const db = require('../db/models')

class TodoService {
    private credentials: {id: number }
    private body: Request['body'];
    private params: Request['params'];
    constructor(req: Request){
        this.credentials = req.app.locals.credentials
        this.body = req.body;
        this.params = req.params;
    }
    getAllTodos = async ():Promise<object[]> => {
        const todos = await db.todo.findAll({
            where: {
                userId: this.credentials.id,
            },
            attributes: ['id', 'description']
        })
        return todos
    }
    createTodo = async ():Promise<object> => {
            const todo = await db.todo.create({
                user_id: this.credentials.id,
                description: this.body.description
        })
        return todo
    }
    getTodo = async():Promise<object> => {
            const todo = await db.todo.findOne({
                where: {
                    id: this.params.id,
                    userId: this.credentials.id
                },
                attributes: ['id', 'description']
            })
        return todo
    }
    updateTodo = async():Promise<object> => {
        const todo = await db.todo.update({
                description: this.body.description 
            }, {
                where: {
                    id: this.params.id,
                    userId: this.credentials.id
                }
            })
        return todo
    }
    deleteTodo = async():Promise<object> => {
            const todo = await db.todo.destroy({
                where: {
                    id: this.params.id, 
                    userId: this.credentials.id
                }
            })
        return todo
    }
    
}   

export default TodoService
