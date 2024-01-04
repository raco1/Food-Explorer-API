const knex = require('../../database/knex')

class UserRepository{
    async findByEmail(email){
        const [user] = await knex('users').where(email)
        return user
    }
    async findUserById(id){
        const user = await knex('users').where(id).first()
        return user
    }
    async create({ name, email, password, isAdmin }){
        const user_id = await knex("users").insert({ name, email, password, isAdmin })
        return { id: user_id }
    }
    async userUpdate({ id, name, email, password }){
        const updatedUser = await knex('users').where({ id }).update({
            name: name,
            email: email,
            password: password,
            updated_at: knex.fn.now()
        })
        return updatedUser
    }
}
module.exports = UserRepository