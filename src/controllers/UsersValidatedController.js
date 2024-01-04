
const AppError = require("../utils/AppError");
const knex = require('../database/knex')

class UsersValidatedController {
  async index(request, response) {
    const user_id = request.user.id

    const checkUserExists = await knex('users').where({ id: user_id })

    if (checkUserExists.length === 0 ) {
      throw new AppError("Unauthorized", 401)
    }

    return response.status(201).json();
  }
}

module.exports = UsersValidatedController;