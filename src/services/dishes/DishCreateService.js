const AppError = require('../../utils/AppError')

class DishCreateService{
    constructor(dishRepository){
        this.dishRepository = dishRepository
    }
    async execute({ title, description, price, category, ingredients, image }){
        const checkIfDishAlreadyExists = await this.dishRepository.findDishBytitle({title})

        if(checkIfDishAlreadyExists.length > 0){
            throw new AppError("Já existe um prato com este nome. Escolha um novo nome ou edite o prato em questão.")
        }

        await this.dishRepository.create({ title, description, price, category, ingredients, image })
    }
}
module.exports = DishCreateService