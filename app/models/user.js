let cuid = require('cuid');

let collectionName = 'user-collection';

let createModel = (model) => ({
  id: cuid(),
  cars: [],
  email: '',
  name: '',
  password: '',
  ...model,
});

module.exports = { collectionName, createModel };
