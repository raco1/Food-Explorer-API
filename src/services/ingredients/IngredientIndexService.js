class IngredientIndexService{
    constructor(ingredientRepository){
        this.ingredientRepository = ingredientRepository
    }
    async execute({ id }){
        return await this.ingredientRepository.findIngredientByDishId({ id })
    }
}
module.exports = IngredientIndexService