const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }
  async findMany(query) {
    const users = await usersModel.find(query).populate("manager","firstName lastName")
    return users
  }
  async createOne(data) {
    const user = await usersModel.create(data)
    return user
  }
  async deleteOne(query) {
    const user = await usersModel.deleteOne(query)
    return user
  }
  async updateOne(query, data) {
    const user = await usersModel.updateOne(query, data)
    return user
  }
}

module.exports = Users