const users = require('./users/users.service.js');
const product = require('./product/product.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(product);
  app.configure(messages);
};
