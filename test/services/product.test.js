const assert = require('assert');
const app = require('../../src/app');
describe('\'product\' service', () => {
  it('registered the service', () => {
    const service = app.service('product');

    assert.ok(service, 'Registered the service');
  });

  it('creates, updates, patch, read, delete and processes product, adds user information', async () => {
    // Create a new user we can use for testing
    const user = await app.service('users').create({
      email: 'helen@feathersjs.com',
      password: 'supersecret',
      permissions: 'get, create, remove, update, patch'
    });
    console.log('user = ', user);
    // The product service call params (with the user we just created)
    const params = { user };
    const product = await app.service('product').create({
      name: 'Test Product',
      description: 'Description of the Product'
    }, params);


    assert.ok(product.name === 'Test Product');
    assert.ok(product.description === 'Description of the Product');

    const product1 = await app.service('product').update(
      product._id,
      {
        name: 'Test Update Product',
        description: 'Description of the Updated Product'
      },
      params
    );

    assert.ok(product1.name === 'Test Update Product');
    assert.ok(product1.description === 'Description of the Updated Product');

    const product2 = await app.service('product').patch(
      product._id,
      {
        name: 'Test Patch Product',
        description: 'Description of the Updated Product'
      },
      params
    );

    assert.ok(product2.name === 'Test Patch Product');
    assert.ok(product2.description === 'Description of the Updated Product');


    const product3 = await app.service('product').get(
      product._id,
      params
    );

    assert.ok(product3.name === 'Test Patch Product');
    assert.ok(product3.description === 'Description of the Updated Product');

    await app.service('product').remove(product._id, params);
    await app.service('users').remove(user._id);
  }).timeout(10000);
});

