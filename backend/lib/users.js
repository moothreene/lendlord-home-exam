const UsersRepo = require('../repository/users');
const { ObjectId } = require('mongodb');

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query);
    return user;
  }

  async findUsers() {
    const users = await this.repo.findMany({});
    return users;
  }

  async createUser(data) {
    const user = await this.repo.createOne(data);
    return user;
  }

  async deleteUser(query) {
    const user = await this.repo.deleteOne(query);
  }

  async updateUser(query, data) {
    const user = await this.repo.updateOne(query, data);
  }

  async getManager(query) {
    const manager = await this.repo.findOne({ role: 'manager', _id: query });
    const users = await this.repo.findMany({ manager: manager._id });
    return Object.assign({}, manager._doc, { users: users });
  }
}

module.exports = Users;
