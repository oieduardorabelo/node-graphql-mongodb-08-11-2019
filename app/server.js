let express = require('express');
let cors = require('cors');
let { MongoClient } = require('mongodb');
let { ApolloServer } = require('apollo-server-express');

let env = require('../config/get-environment');
let logger = require('../config/get-logger');
let mistake = require('../config/get-mistake');
let { createMongoInterface } = require('../db/mongo-interface');

let resolvers = require('./resolvers');
let typeDefs = require('./schemas');

async function main() {
  let mongoClient = await MongoClient.connect(env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let mongoDatabase = mongoClient.db(env.MONGO_DATABASE_NAME);
  let mongoInterface = createMongoInterface(mongoDatabase);

  let server = express();

  let serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (expressContext) => {
      let me = await mongoInterface.getUserFromExpressContext(expressContext);
      return { db: mongoInterface, me, mistake };
    },
  });

  server.use(cors());
  server.listen(env.PORT, logger.onServerListen);

  serverApollo.applyMiddleware({ app: server });
}

main();
