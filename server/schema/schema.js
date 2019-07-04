const graphql = require('graphql'); // on va attribuer à une variable le paquet npm précédemment installé

const { GraphQLObjectType, GraphQLString } = graphql; // on destructure ici, cad on prend des variables du paquet graphql

const BookType = new GraphQLObjectType({ // on va typer notre objet : un nom et les champs qu'il contient avec le type
    name: 'Book',
    fields: () => ({ // on verra plus tard pourquoi c'est une fonction
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})