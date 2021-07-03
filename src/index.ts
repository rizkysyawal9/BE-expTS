import express, { Application, Request, Response } from 'express'
import morgan from 'morgan';
import compression from 'compression'
import helmet from 'helmet';
import cors from 'cors'
import dotenv from 'dotenv'

//Routers 
import UserRoutes from './routers/UserRoutes';
import AuthRoutes from './routers/AuthRoutes';

class App {
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv.config()
    }

    // Initialize Middlewares, Routes, etc.
    protected plugins(): void {
        // Use body parser to parse JSON requests
        this.app.use(express.json());
        // User logger library 
        this.app.use(morgan('dev'));
        // Use compression library
        this.app.use(compression());
        // Use helmet library to protect your headers
        this.app.use(helmet());
        // Use cors library
        this.app.use(cors());
        //
    }

    // Used to define routes
    protected routes(): void {
        this.app.use("/api/v1/users", UserRoutes)
        this.app.use("/api/v1/auth", AuthRoutes)
    }
}

const port: number = 8000;
// Initialize Express application
const app = new App().app;
app.listen(port, () => {
    console.log("Aplikasi ini berjalan di port " + port);
    console.log(process.env.DB_HOST)
})



