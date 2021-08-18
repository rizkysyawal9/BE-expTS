import express, { Application, Request, Response } from 'express'
import morgan from 'morgan';
import compression from 'compression'
import helmet from 'helmet';
import cors from 'cors'
import dotenv from 'dotenv'
import grahql, { GraphQLSchema, GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'
import { graphqlHTTP } from 'express-graphql';  

//Ruters 
import AuthRoutes from './routers/AuthRoutes';
import TodoRoutes from './routers/TodoRoutes';
import { resolve } from 'bluebird';
const userData = require('../mockData.json');

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
        this.app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
        // Use cors library
        this.app.use(cors());
    }

    // Used to define routes
    protected routes(): void {
        this.app.use("/api/v1/auth", AuthRoutes)
        this.app.use("/api/v1/todo", TodoRoutes)
    }
}

const port: number = 8000;
// Initialize Express application
const app = new App().app;

const UserType = new GraphQLObjectType({
    name:"User",
    fields: () => ({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllUsers: {
            type: GraphQLList(UserType),
            args: 
            {
                id: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                // do database queries
                return userData
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUers: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){
                userData.push({
                    id: userData.length +1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return args
            }

        }
    } 
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

// Initailize graphql server
app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))


app.listen(port, () => {
    console.log("Aplikasi ini berjalan di port " + port);
    console.log(process.env.DB_HOST)
})




