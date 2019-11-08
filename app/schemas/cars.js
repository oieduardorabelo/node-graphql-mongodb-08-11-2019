let { gql } = require('apollo-server-express');

let typeDefs = gql`
  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    user: User
  }

  type CarConnection {
    edges: [Car]
  }

  input GetCarInput {
    id: ID!
  }

  input CreateCarInput {
    make: String!
    model: String!
    color: String!
  }

  input DeleteCarInput {
    id: ID!
  }

  extend type Query {
    listCars: CarConnection
    getCar(input: GetCarInput): Car
  }

  extend type Mutation {
    createCar(input: CreateCarInput): Car!
    deleteCar(input: DeleteCarInput): Car!
  }
`;

module.exports = { typeDefs };
