let { gql } = require('apollo-server-express');

let typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    cars: [Car]
  }

  type UserConnection {
    edges: [User]
  }

  input GetUserInput {
    id: ID!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input DeleteUserInput {
    id: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  extend type Query {
    listUsers: UserConnection
    getUser(input: GetUserInput): User
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput): User!
    deleteUser(input: DeleteUserInput): User!
    login(input: LoginUserInput): Token!
  }
`;

module.exports = { typeDefs };
