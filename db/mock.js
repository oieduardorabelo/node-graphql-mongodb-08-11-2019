let { createUserModel } = require('../app/models/user');
let { createCarModel } = require('../app/models/car');

let users = [
  {
    id: 1,
    name: 'John',
    cars: [1, 6],
  },
  {
    id: 2,
    name: 'Susan',
    cars: [2, 5],
  },
  {
    id: 3,
    name: 'Mark',
    cars: [3, 4],
  },
];

let cars = [
  {
    id: 1,
    make: 'Ford',
    model: 'Focus',
    color: 'red',
    userId: 1,
  },
  {
    id: 2,
    make: 'Fiat',
    model: '500',
    color: 'blue',
    userId: 2,
  },
  {
    id: 3,
    make: 'Mercedes',
    model: 'C250',
    color: 'silver',
    userId: 3,
  },
  {
    id: 4,
    make: 'Mercedes',
    model: 'D123',
    color: 'gold',
    userId: 3,
  },
  {
    id: 5,
    make: 'Kloa',
    model: 'm123',
    color: 'purple',
    userId: 2,
  },
  {
    id: 6,
    make: 'HobsonT123',
    model: 'C123L',
    color: 'green',
    userId: 1,
  },
];

let createCar = async (input) => {
  let car = createCarModel(input);
  cars.push(car);
  return car;
};

let createUser = async (input) => {
  let user = createUserModel(input);
  users.push(user);
  return user;
};

let deleteUser = async (userId) => {
  let user = users.find((user) => user.id === userId);
  users = users.filter((user) => user.id !== userId);
  return user;
};

let deleteCar = async (carId) => {
  let car = cars.find((car) => car.id === carId);
  cars = cars.filter((car) => car.id !== carId);
  return car;
};

let getUserById = async (userId) => {
  return users.find((user) => user.id === userId);
};

let getUsers = async () => {
  return users;
};

let getCars = async () => {
  return cars;
};

let getCarById = async (carId) => {
  return cars.find((car) => car.id === carId);
};

let getCarsByIds = async (carIds) => {
  return carIds.map((cardId) => getCarById(cardId));
};

module.exports = {
  createCar,
  createUser,
  deleteCar,
  deleteUser,
  getCarById,
  getCars,
  getCarsByIds,
  getUserById,
  getUsers,
};
