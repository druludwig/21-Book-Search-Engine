const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    title: String
    authors: [String]
    decription: String
    image: String
    link: String
  }

  input addBook {
    bookId: ID!
    title: String
    authors: [String]
    decription: String
    image: String
    link: String
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(input: addBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
