require("dotenv/config");
const { hash } = require('bcryptjs')
const AppError = require('../../utils/AppError')

class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async execute({ name, email, password }){
        const checkIfEmailIsBeingUsed = await this.userRepository.findByEmail({email})

        if(checkIfEmailIsBeingUsed){
            throw new AppError("E-mail já cadastrado. Use um e-mail diferente ou faça o login.")
        } else if(!name || !email || !password){
            throw new AppError("Por favor, preencha todos os campos para realizar o cadastro.")
        } else if(name.length < 3){
            throw new AppError("Por favor, digita um nome válido, com mais de 4 caracteres.")
        } else if(!email.includes("@", ".")){
            throw new AppError("Por favor, digite um e-mail válido.")
        } else if(password.length < 6){
            throw new AppError("A senha deve ter pelo menos 6 digitos.")
        }
        
        const hashedPassword = await hash(password, 8)

        const isItAdminEmail = email.includes(process.env.ADMIN_EMAIL || "@admin.com")
        const isAdmin = isItAdminEmail ? true : false

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword, isAdmin })

        return userCreated
    }

}
module.exports = UserCreateService