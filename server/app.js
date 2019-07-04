const express = require('express');
const graphqlHTTP = require('express-graphql'); // création du serveur express qui va executer graphql api

const app = express();

app.use('/graphql', graphqlHTTP({ // fonction servant de noeud central/middleware qui va envoyer toutes les requetes graphql en un seul endroit

}));



app.listen(4000, () => { // in browser: http://localhost:4000/graphql
    console.log('now listening for request on port 4000');
})