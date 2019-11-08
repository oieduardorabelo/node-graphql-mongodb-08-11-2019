let resolvers = {
  Query: {
    listUsers: async (parent, payload, context) => {
      let edges = await context.db.getUsers();
      return { edges };
    },
    getUser: async (parent, payload, context, _info) => {
      let { input } = payload;
      let user = await context.db.getUserById(input.id);
      return user;
    },
    me: (parent, payload, context) => context.me,
  },
  Mutation: {
    createUser: async (parent, payload, context, _info) => {
      let user = await context.db.createUser(payload.input);
      return user;
    },
    deleteUser: async (parent, payload, context, _info) => {
      if (!context.me) {
        throw new Error(context.mistake.LOGIN_REQUIRED);
      }
      if (context.me.id !== payload.input.id) {
        throw new Error(context.mistake.CREDENTIALS_NOT_AUTHORIZED);
      }

      let user = await context.db.deleteUser(payload.input.id);
      return user;
    },
    login: async (parent, payload, context, _info) => {
      let token = await context.db.getUserToken(payload.input);
      return { token };
    },
  },
  User: {
    cars: async (parent, _payload, context, _info) => {
      let cars = await context.db.getCarsByIds(parent.cars);
      return cars;
    },
  },
};

module.exports = { resolvers };
