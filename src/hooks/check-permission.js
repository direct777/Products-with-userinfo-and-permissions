//const _ = require('lodash');
//const axios = require('axios');
//const { getItems } = require('feathers-hooks-common');
const { BadRequest } = require('@feathersjs/errors');

module.exports = () => async context => {
  //console.log('context=', context);
  const {
    params: {
      user: { permissions }
    },
    method
  } = context;
  //console.log('method=', method);
  //console.log('user.permissions=', permissions);
  if(!(permissions).split(', ').includes(method)) {
    throw new BadRequest(`'${method}' permission is missing`);
  } else {
    console.log(`'${method}' permission is present`);
  }
};
