class DishShowService{
    constructor(dishRepository, ingredientRepository){
        this.dishRepository = dishRepository
        this.ingredientRepository = ingredientRepository
    }
    async execute ({ id }){
        const dishes = await this.dishRepository.findDishById({ id })
        const ingredients = await this.ingredientRepository.findIngredientById({ dish_id : id })
        
        const showList = {
            ...dishes,
            ingredients
        }
        return showList
    }
}
module.exports = DishShowService