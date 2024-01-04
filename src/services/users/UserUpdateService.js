const { compare, hash  } = require('bcryptjs')
const AppError = require('../../utils/AppError')

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ id, name, email, old_password, password }){
        if (!name && !email && !password && !old_password) {
            throw new AppError("Nenhuma informação recebida.");
          }
        const user = await this.userRepository.findUserById({ id })
       
        if(!user){
            throw new AppError(`Usuário não encontrado.`)
        }
        if(email){
            const [ checkIfEmailIsBeingUsed ] = await this.userRepository.findUserByEmail({ email })
            if(checkIfEmailIsBeingUsed && checkIfEmailIsBeingUsed.id !== id){
                throw new AppError("Este e-mail já está em uso.")
            }
        }
        
        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password){
            throw new AppError("Por favor, insira a senha antiga para definir uma nova senha.")
        }
        if(password && old_password){
            const checkPasswords = await compare(old_password, user.password)
            if(!checkPasswords){
                throw new AppError("A senha antiga não confere.")
            }
            user.password = await hash(password, 8)
        }
        await this.userRepository.userUpdate({ id, name, email, password: user.password })
    }
}
module.exports = UserService