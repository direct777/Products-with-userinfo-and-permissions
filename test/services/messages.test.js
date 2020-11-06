const assert = require('assert');
const app = require('../../src/app');

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });
  describe('local strategy', () => {
    const userInfo = {
      email: 'helen@feathersjs.com',
      password: 'supersecret',
      permissions: 'create, get, remove'
    };

    before(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user, creates product and reads corresponding message. Removing messages, product and user', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      });

      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');

      const params = { user };
      console.log('user=', user);
      const product = await app.service('product').create({
        name: 'Test Product',
        description: 'Description of the Product'
      }, params);
      assert.ok(product.name === 'Test Product');
      assert.ok(product.description === 'Description of the Product');
      const query = {userIds: user._id};
      const params1 = { user, query };
      const message = await app.service('messages').find(
        params1
      );
      console.log('message=', message);
      for(const item of message.data) {
        console.log(`email: ${item.emails}`);
        assert.ok(item.emails === user.email);
      }

      for(const item of message.data) {
        await app.service('messages').remove(item._id, params);
      }
      await app.service('product').remove(product._id, params);
      await app.service('users').remove(user._id);
    }).timeout(10000);
  });
});
