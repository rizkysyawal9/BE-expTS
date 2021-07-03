import AuthController from "../controllers/AuthController";
import BaseRouter from "./BaseRouter";
import { auth } from '../middlewares/AuthMiddleware'
import validate from '../middlewares/AuthValidator'


class AuthRoutes extends BaseRouter {
    routes(): void {
        this.router.post("/register", validate, AuthController.register)
        this.router.post("/login", validate, AuthController.login)
        this.router.post("/profile", auth, AuthController.profile)
    }
}

export default new AuthRoutes().router