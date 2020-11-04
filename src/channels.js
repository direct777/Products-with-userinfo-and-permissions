module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;
      console.log(`user=${user}`);
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      // Easily organize users by email and userid for things like messaging
      app.channel(`emails/${user.email}`).join(connection);
      app.channel(`userIds/${user.id}`).join(connection);
    }
  });
  const updateChannels = product => {
    console.log('product updated=', product);

    app.service('messages').create({
      userIds: `${product.userId}`,
      emails: `${product.user.email}`,
      text: `Product updated name: ${product.name}`
    }, {});
  }
  const createChannels = product => {
    console.log('product created =', product);

    app.service('messages').create({
      userIds: `${product.userId}`,
      emails: `${product.user.email}`,
      text: `Product created name: ${product.name}`
    }, {});
  }
  app.service('product').on('updated', updateChannels);
  app.service('product').on('patched', updateChannels);
  app.service('product').on('created', createChannels);
  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });
};
