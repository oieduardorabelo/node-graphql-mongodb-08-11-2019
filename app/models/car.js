let cuid = require('cuid');

let collectionName = 'car-collection';

let createModel = (model) => ({
  id: cuid(),
  make: '',
  model: '',
  color: '',
  userId: '',
  ...model,
});

module.exports = { collectionName, createModel };
