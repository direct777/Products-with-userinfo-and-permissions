// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    const { user } = context.params;

    context.data = {
      name: data.name,
      description: data.description,
      userId: user._id,
      createdAt: Date.now()
    };

    return context;
  };
};
