import { Router } from 'express'
import RouterInterface from './RouterInterface';

abstract class BaseRouter implements RouterInterface{
    public router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    abstract routes(): void
}

export default BaseRouter