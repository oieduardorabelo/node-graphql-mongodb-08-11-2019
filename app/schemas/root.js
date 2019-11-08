let { gql } = require('apollo-server-express');

let typeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = { typeDefs };
