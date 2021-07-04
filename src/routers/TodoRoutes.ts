import BaseRouter from "./BaseRouter";
import TodoController from "../controllers/TodoController";
import { auth } from "../middlewares/AuthMiddleware";
import todoValidator from "../middlewares/TodoValidator";

class TodoRoutes extends BaseRouter{
    routes(): void {
        this.router.get('/', auth, TodoController.index)
        this.router.post('/', auth, todoValidator, TodoController.create)
        this.router.get('/:id', auth, TodoController.read)
        this.router.put('/:id', auth, todoValidator, TodoController.update)
        this.router.delete('/:id', auth, todoValidator, TodoController.delete)
    }
}

export default new TodoRoutes().router