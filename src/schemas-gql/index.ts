import grahql, { GraphQLSchema, GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'
import { UserType } from './typeDef/UserType'
const userData = require('../../mockData.json')

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
        createUsers: {
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

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})