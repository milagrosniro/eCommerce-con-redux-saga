const functions = require("firebase-functions");

 const admin = require('firebase-admin');
const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const serviceAccount = require('./ecommerce-redux-saga-4c950-firebase-adminsdk-nakqj-69ff46e143.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    dataBaseURL:'https://ecommerce-redux-saga-4c950-default-rtdb.firebaseio.com'
});

//en la carpeta functions con npm run serve se ve todo, el comando tira un link 
const typeDefs = gql`
type Post{
    userId: Int
    id: Int
    title: String
    body: String
}

type Query{
    posts: [Post]
}
 `;

const resolves = {
    Query:{
        posts: ()=>{
            return admin 
            .database()
            .ref('posts')
            .once('value')
            .then(snap => snap.val())
            .then(val => Object.keys(val).mal((key)=>val[key]))
        }
    }
}

const app = express();

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({
    app,
    path,
    cors: true
})

exports.graphql = functions.https.onRequest(app);