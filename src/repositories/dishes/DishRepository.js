const knex = require('../../database/knex')

class DishRepository{
    async findDishBytitle({title}){
        const dish = await knex('dishes').where({title})
        return dish
    }
    async findDishById(id){
        const dish = await knex('dishes').where(id).first()
        return dish
    }
    async create({ title, description, price, category, image, ingredients }){
        const [dish_id] = await knex("dishes").insert({ title, description, category, price, image })

        const ingredient = typeof ingredients === "string"
        
        let ingredientsInsert

        if(ingredient){
            ingredientsInsert =  {
                dish_id,
                name: ingredients
            }
            await knex('ingredients').insert(ingredientsInsert)
            return { id: dish_id, ingredientsInsert }

        } else if (ingredients.length > 1 ){
                ingredientsInsert = ingredients.map(ingredients => {
                return {
                    dish_id,
                    name: ingredients
                }
            })
            await knex('ingredients').insert(ingredientsInsert)
            return { id: dish_id, ingredientsInsert }
        }
    }
    async dishUpdate({ id, title, description, price, ingredients }){
        const [dish] = await knex('dishes').where({ id })

        const dishUpdate = await knex('dishes').update({ title, description, price }).where({ id })

        const ingredient = typeof ingredients === "string"
        
        let filteredIngredients

        if(ingredient){
            filteredIngredients = {
                dish_id: dish.id,
                name: ingredients
            }
            await knex('ingredients').where({ dish_id: dish.id }).delete()
            await knex('ingredients').insert(filteredIngredients)
            return { dishUpdate, filteredIngredients }

        } else if (ingredients.length > 1){
            filteredIngredients = ingredients.map(ingredient => {
                return{
                    dish_id: dish.id,
                    name: ingredient
                }
            })
            await knex('ingredients').where({ dish_id: dish.id }).delete()
            await knex('ingredients').insert(filteredIngredients)
            return { dishUpdate, filteredIngredients }
        }
    }
    async dishAvatarUpdate(id, imageFileName){
        return await knex("dishes").update({ image: imageFileName }).where({ id })
    }
    async index({title,ingredients}){
        let dishes

        if (ingredients) {
            const filteredIngredients = ingredients.split(',').map(ingredient => ingredient.trim())
        
            dishes = await knex('ingredients')
            .select(["dishes.id", "dishes.title", "dishes.description", "dishes.price"])
            .whereLike('dishes.title', `%${title}%`)
            .whereIn('name', filteredIngredients)
            .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
            .orderBy('dishes.title')
        } else {
            dishes = await knex('dishes')
            .whereLike('title', `%${title}%`)
            .orderBy('title')
        }
        
        const everyIngredient = await knex('ingredients')
        const dishesWithIngredients = dishes.map(dish => {
        const dishIngredient = everyIngredient.filter((ingredient) => (ingredient.dish_id === dish.id))
            return {
                ...dish,
                ingredient: dishIngredient
            }
        })
        
    return dishesWithIngredients     
}
    async delete(id) {
        await knex("dishes").delete().where(id);
    }
}
module.exports = DishRepository