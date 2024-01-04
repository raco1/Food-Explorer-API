const AppError = require('../../utils/AppError')

class DishUpdateService {
    constructor(dishRepository){
        this.dishRepository = dishRepository
    }
    async execute({ id, title, description, price, ingredients}){
        const dish = await this.dishRepository.findDishById({ id })
        if(!dish){
            throw new AppError("Prato não encontrado ou não existe.")
        }
        const checkIfDishExistes = dish.title
        if(checkIfDishExistes && checkIfDishExistes !== dish.title){
            throw new AppError("Já existe um prato com este título, por favor, selecione outro título.")
        }

        const dishUpdated = await this.dishRepository.dishUpdate({ id: dish.id, title, description, price, ingredients })

        return dishUpdated
    }
}
module.exports = DishUpdateService