const knex = require('../../database/knex')

class IngredientRepository{
     async findIngredientById(id){
        const ingredient = await knex('ingredients').where(id)
        return ingredient
    }
}
module.exports = IngredientRepository