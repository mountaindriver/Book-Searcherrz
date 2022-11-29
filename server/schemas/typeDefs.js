const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input BookInput {
        authors: [String!]!
        bookId: String!
        description: String!
        image: String
        link: String
        title: String!
      }
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: String!
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String!]!
        description: String!
        title: String!
        image: String!
        link: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(authors: [String!]!, bookId: String!, description: String!, image: String link: String, title: String!): User
        removeBook(bookId: ID!): User 
    }

`;

module.exports = typeDefs;
