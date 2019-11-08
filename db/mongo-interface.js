let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let env = require('../config/get-environment');
let mistake = require('../config/get-mistake');

let userModel = require('../app/models/user');
let carModel = require('../app/models/car');

function createMongoInterface(mongoDatabase) {
  let userCollection = mongoDatabase.collection(userModel.collectionName);
  let carCollection = mongoDatabase.collection(carModel.collectionName);

  let createCar = async (input) => {
    let newRecord = carModel.createModel(input);
    let [carCommand] = await Promise.all([
      carCollection.insertOne(newRecord),
      userCollection.updateOne(
        { id: input.userId },
        {
          $push: { cars: newRecord.id },
        }
      ),
    ]);
    return carCommand.ops[0];
  };

  let createUser = async (input) => {
    let newRecord = userModel.createModel(input);
    newRecord.password = await bcrypt.hash(newRecord.password, 10);
    let command = await userCollection.insertOne(newRecord);
    return command.ops[0];
  };

  let deleteUser = async (userId) => {
    let [userCommand] = await Promise.all([
      userCollection.findOneAndDelete({ id: userId }),
      carCollection.deleteMany({ userId }),
    ]);
    return userCommand.value;
  };

  let deleteCar = async ({ carId, userId }) => {
    let [carCommand] = await Promise.all([
      carCollection.findOneAndDelete({ id: carId }),
      userCollection.updateOne(
        { id: userId },
        {
          $pull: { cars: carId },
        }
      ),
    ]);
    return carCommand.value;
  };

  let getUserById = async (userId) => {
    let record = await userCollection.findOne({ id: userId });
    return record;
  };

  let getUserFromExpressContext = async ({ req }) => {
    let token = req.get('Authorization');

    if (!token) {
      return null;
    }

    try {
      let tokenData = await jwt.verify(
        token.replace('Bearer ', ''),
        env.JWT_SECRET_STRING
      );
      let record = await userCollection.findOne({ id: tokenData.id });
      return record;
    } catch (error) {
      throw new Error(mistake.TOKEN_EXPIRED);
    }
  };

  let getUserToken = async (input) => {
    let record = await userCollection.findOne({ email: input.email });

    if (!record) {
      throw new Error(mistake.CREDENTIALS_INVALID);
    }

    let isValidPassword = await bcrypt.compare(input.password, record.password);

    if (!isValidPassword) {
      throw new Error(mistake.CREDENTIALS_INVALID);
    }

    let token = jwt.sign({ id: record.id }, env.JWT_SECRET_STRING, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return token;
  };

  let getUsers = async () => {
    let command = await userCollection.find({});
    return command.toArray();
  };

  let getCars = async () => {
    let command = await carCollection.find({});
    return command.toArray();
  };

  let getCarById = async (carId) => {
    let record = await carCollection.findOne({ id: carId });
    return record;
  };

  let getCarsByIds = async (carsIds) => {
    let command = await carCollection.find({ id: { $in: carsIds } });
    return command.toArray();
  };

  return {
    createCar,
    createUser,
    deleteCar,
    deleteUser,
    getCarById,
    getCars,
    getCarsByIds,
    getUserById,
    getUserFromExpressContext,
    getUsers,
    getUserToken,
  };
}

module.exports = { createMongoInterface };
