const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');


const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });
const resolverArray = loadFilesSync('**/*', {
    extensions: ['resolvers'],
});


const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolverArray,
});


const app = express();


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('Running GraphQl server...')
});