let resolvers = {
  Query: {
    listCars: async (parent, payload, context) => {
      let edges = await context.db.getCars();
      return { edges };
    },
    getCar: async (parent, payload, context, _info) => {
      let { input } = payload;
      let car = await context.db.getCarById(input.id);
      return car;
    },
  },
  Mutation: {
    createCar: async (parent, payload, context, _info) => {
      if (!context.me) {
        throw new Error(context.mistake.LOGIN_REQUIRED);
      }
      payload.input.userId = context.me.id;
      let car = await context.db.createCar(payload.input);
      return car;
    },
    deleteCar: async (parent, payload, context, _info) => {
      if (!context.me) {
        throw new Error(context.mistake.LOGIN_REQUIRED);
      }

      let car = await context.db.deleteCar({
        carId: payload.input.id,
        userId: context.me.id,
      });
      return car;
    },
  },
  Car: {
    user: async (parent, _payload, context, _info) => {
      let user = await context.db.getUserById(parent.userId);
      return user;
    },
  },
};

module.exports = { resolvers };
