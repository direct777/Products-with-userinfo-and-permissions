const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
  it('creates a user, encrypts password and adds permissions', async () => {
    const user = await app.service('users').create({
      email: 'test@example.com',
      password: 'secret',
      permissions: 'get, create'
    });
    console.log('user=', user);
    // Verify Gravatar has been set as we'd expect
    //assert.equal(user.avatar, 'https://s.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=60');
    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
    assert.ok(user.permissions === 'get, create');
    await app.service('users').remove(user._id);
  });
  it('removes password for external requests', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    const user = await app.service('users').create({
      email: 'test2@example.com',
      password: 'secret',
      permissions: 'get, create'
    }, params);

    // Make sure password has been removed
    assert.ok(!user.password);
    await app.service('users').remove(user._id);
  });
});
