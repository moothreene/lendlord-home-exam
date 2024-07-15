const { ObjectId } = require('mongodb');
const Users = require('../lib/users');
const users = new Users();

/**
 * Gets user by id
 */
exports.getUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await users.findUser({ _id: new ObjectId(id) });
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const usersList = await users.findUsers({});
    ctx.status = 200;
    ctx.body = usersList;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.createUser = async (ctx) => {
  const { firstName, lastName, email, role, salary, manager } =
    ctx.request.body;
  try {
    await users.createUser({
      firstName,
      lastName,
      email,
      role,
      salary,
      manager: manager ? new ObjectId(manager) : null,
    });

    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.deleteUserById = async (ctx) => {
  const { id } = ctx.params;
  try {
    await users.deleteUser({ _id: new ObjectId(id) });
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.updateUserById = async (ctx) => {
  const { id } = ctx.params;
  const { firstName, lastName, email, role, salary, manager } =
    ctx.request.body;
  try {
    await users.updateUser(
      { _id: new ObjectId(id) },
      {
        firstName,
        lastName,
        email,
        role,
        salary,
        manager: manager ? new ObjectId(manager) : null,
      }
    );

    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.getManager = async (ctx) => {
  const { id } = ctx.params;
  try {
    const manager = await users.getManager({ _id: new ObjectId(id) });
    ctx.status = 200;
    ctx.body = manager;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

async function initialize() {
  await users.initialize();
}

initialize();
