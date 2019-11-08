let root = require('./root');

let cars = require('./cars');
let users = require('./users');

module.exports = [root.typeDefs, cars.typeDefs, users.typeDefs];
