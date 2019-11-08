let cars = require('./cars');
let users = require('./users');

module.exports = [cars.resolvers, users.resolvers];
