const IngredientRepository = require('../repositories/ingredients/IngredientRepository')
const IngredientIndexService = require('../services/ingredients/IngredientIndexService')
class IngredientsController {
    async index(request, response){
        const id = request.params.id

        const ingredientRepository = new IngredientRepository()
        const ingredientIndexService = new IngredientIndexService(ingredientRepository)

        const ingredients = await ingredientIndexService.execute({ id })
        
        return response.json(ingredients)
    }
};

module.exports = IngredientsController