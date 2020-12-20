const express = require('express');

const userData = require('./MOCK_DATA.json');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema , GraphQLObjectType ,
  GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql');
const app = express();

// constructor de esquema que usa un esquema de graphql
/* const simpleHello = buildSchema(`
  type Query {
    hello: String
  }
`); */


const UserType = new GraphQLObjectType({
name:'User',
fields: ()=>({
  id: {type:GraphQLInt},
  first_name: {type :GraphQLString},
  last_name: {type:GraphQLString},
  email: {type:GraphQLString},
  gender:{type:GraphQLString}
})
});




const userQuery = new GraphQLObjectType({
  name : 'person',
  fields: {
    getUsers:{
      type : new GraphQLList(UserType),
      args: { id:{ type:GraphQLInt },
      first_name:{ type:GraphQLString },
      last_name:{ type:GraphQLString },
      email:{ type:GraphQLString },
      gender:{ type:GraphQLString }},
      resolve(parent , args){
        return userData;
      }
    }
  }
});

const Mutation  = new GraphQLObjectType({
name: 'Mutation',
fields: {
  createUser: {
    type:UserType,
    args:{
      firt_name:{type: GraphQLString},
      last_name:{type: GraphQLString},
      email:{type: GraphQLString},
      gender:{type: GraphQLString}
    },
    resolve(parent , args){
      userData.push({id:userData.length+1,first_name: args.first_name,last_name: args.last_name,email: args.email,gender: args.gender});
        return args;
    }
  }
}
});


//constante para cada endpoint -> rutas
const root = {
    hello: () => {
        return 'Hello world from graphql'
    }
}

const schemaUser = new GraphQLSchema({query :userQuery, mutation:Mutation});

app.use('/graphql', graphqlHTTP({
    schema:schemaUser,
    graphiql: true
}));


app.listen(8080, console.log("puerto vivo en la 8080"));