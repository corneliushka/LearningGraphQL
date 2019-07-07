const graphql = require('graphql'); // on va attribuer à une variable le paquet npm précédemment installé

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql; // 1. on destructure ici, cad on prend des variables du paquet graphql

const BookType = new GraphQLObjectType({ // 2. on va typer notre objet (Book) : un nom et les champs qu'il contient avec le type 
    name: 'Book',
    fields: () => ({ // les champs qu'on attend 
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType ({ // 3. represents all of the possible entry points into the GraphQL API
    name: 'RootQueryType',
    fields: {
        book: { // quand qqun demande une requete pour un livre, il faut specifier un ID de type string 
            type: BookType, 
            args: {id: {type: GraphQLString}},
            resolve(parent, args){ // dans la fonction resolve on spécifie quelle data on a besoin de la source (args = va contenir le champ ID que l'user va envoyer dans sa requete)
                // code to get data from db / other source

            }
        }
    }
})


module.exports = new GraphQLSchema({ // 4. ici on va exporter notre schèma 
    query: RootQuery
})