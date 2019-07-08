const graphql = require('graphql'); // on va attribuer à une variable le paquet npm précédemment installé
const _ = require('lodash'); // 6. apres avoir installé lodash 

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList } = graphql; // 1. on destructure ici, cad on prend des variables du paquet graphql


//5. Dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]

// 6. dummy data

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
]

const BookType = new GraphQLObjectType({ // 2. on va typer notre objet (Book) : un nom et les champs qu'il contient avec le type 
    name: 'Book',
    fields: () => ({ // les champs qu'on attend , c'est une fonction car on execute le code a l'interieur
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({ 
    name: 'Author',
    fields: () => ({  
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType), // on va chercher la nouvelle variable du paquet, 
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id}); 
            }
        } // pour rajouter un nouveau champ "livreS", on ajoute du package graphql GraphQLList
    })
})

const RootQuery = new GraphQLObjectType ({ // 3. represents all of the possible entry points into the GraphQL API
    name: 'RootQueryType',
    fields: { // ici c'est un objet car c'est juste leur referent / stock / noeuf / racine des differents types 
        book: { // quand qqun demande une requete pour un livre, il faut specifier un ID de type string 
            type: BookType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args){ // dans la fonction resolve on spécifie quelle data on a besoin de la source (args = va contenir le champ ID que l'user va envoyer dans sa requete)
                // code to get data from db / other source
                console.log(typeof(args.id))
                return _.find(books, {id: args.id}); // 7. trouver dans les tableaux books l'ID et les arguments qui s'en rapportent 
            }
        },
        author: {
            type: AuthorType,
            args : {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({ // 4. ici on va exporter notre schèma 
    query: RootQuery
})