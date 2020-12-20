const express = require('express');

const userData = require('./MOCK_DATA.json');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

// constructor de esquema que usa un esquema de graphql
const simpleHello = buildSchema(`
  type Query {
    hello: String
  }
`);




//constante para cada endpoint -> rutas
const root = {
    hello: () => {
        return 'Hello world from graphql'
    }
}

app.use('/graphql', graphqlHTTP({
    schema: simpleHello,
    rootValue: root,
    graphiql: true
}));


app.listen(8080, console.log("puerto vivo en la 8080"));