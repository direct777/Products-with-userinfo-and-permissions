const { authenticate } = require('@feathersjs/authentication').hooks;
const populateUser = require('../../hooks/populate-user');
const processProduct = require('../../hooks/process-product');
const checkPermission = require('../../hooks/check-permission');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [checkPermission()],
    create: [processProduct(), checkPermission()],
    update: [processProduct(), checkPermission()],
    patch: [processProduct(), checkPermission()],
    remove: [checkPermission()]
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
