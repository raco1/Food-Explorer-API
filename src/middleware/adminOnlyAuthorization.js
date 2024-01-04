const UserRepository = require('../repositories/users/UserRepository')
const AppError = require('../utils/AppError')

async function adminOnlyAuthtorization(request, response, next){
        const user_id = request.user.id

        const userRepository = new UserRepository();

        const user = await userRepository.findUserById({ id: user_id});

        if(user.isAdmin !== 1){
            throw new AppError("User unauthorized.", 401)
        }
        return next()   
}
module.exports = adminOnlyAuthtorization