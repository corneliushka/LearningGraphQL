const express = require('express'); // 1
const graphqlHTTP = require('express-graphql'); // 2 création du serveur express qui va executer graphql api
const schema = require('./schema/schema') // 6. une fois notre schema defini (cf. fichier associé), on l'importe 


const app = express(); // 3

app.use('/graphql', graphqlHTTP({ // 4 fonction servant de noeud central/middleware qui va envoyer toutes les requetes graphql en un seul endroit
    schema, // 7. une fois notre schema importé ci dessus, on l'inclut dans notre middleware
    graphiql: true
}));


app.listen(4000, () => { // 5 une fois installé nodemon ,  va "ecouter les changements" in browser: http://localhost:4000/graphql 
    console.log('now listening for request on port 4000');
})