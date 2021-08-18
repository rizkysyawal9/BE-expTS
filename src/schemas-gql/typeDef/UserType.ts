import grahql, { GraphQLSchema, GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'

export const UserType = new GraphQLObjectType({
    name:"User",
    fields: () => ({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})
