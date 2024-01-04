const UserRepository = require('../repositories/users/UserRepository')
const UserCreateService = require('../services/users/UserCreateService')
const UserUpdateService = require('../services/users/UserUpdateService')

class UserController {
    async create(request, response){
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({ name, email, password})
       
        return response.status(201).json()
    }
    async update(request, response){
        const { name, email, old_password, password } = request.body
        const  user_id  = request.user.id

        const userRepository = new UserRepository()
        const userUpdateService = new UserUpdateService(userRepository)
    
        await userUpdateService.execute({ id: user_id, name, email, old_password, password })

        return response.status(201).json()
    }
}
module.exports = UserController

