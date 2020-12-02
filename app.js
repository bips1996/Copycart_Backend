const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const expressPlayground = require('graphql-playground-middleware-express').default




const app = express();
app.use(bodyParser.json());


const graphQlSchema = require('./apis/schema/graphqlSchema');
const graphQlResolvers = require('./apis/resolver/graphqlResolver');

app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  )
app.get('/playground', expressPlayground({ endpoint: '/graphql' })) 
  


  mongoose.connect("mongodb+srv://Biplaba:bips1996@copycart.vkz7v.mongodb.net/Copycart_beta?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,})
    .then(() => {
        app.listen(3000);
      })
      .catch(err => {
        console.log(err);
      });


