const DishRepository = require('../repositories/dishes/DishRepository')
const IngredientRepository = require('../repositories/ingredients/IngredientRepository')

const DishCreateService = require('../services/dishes/DishCreateService')
const DishUpdateService = require('../services/dishes/DishUpdateService')
const DishShowService = require('../services/dishes/DishShowService')
const DishDeleteService = require('../services/dishes/DishDeleteService')
const DishIndexService = require('../services/dishes/DishIndexService')

const DiskStorage = require("../providers/DiskStorage")

class DishesController {
    async create(request, response){
        const { title, description, price, category, ingredients } = request.body

        const imageFileName = request.file.filename;

        const diskStorage = new DiskStorage()

        const filename = await diskStorage.saveFile(imageFileName)

        const dishRepository = new DishRepository()
        const dishCreateService = new DishCreateService(dishRepository)

        await dishCreateService.execute({ title, description, price, category, image: filename, ingredients })

        return response.status(201).json()
    }
    async update(request, response){
        const { title, description, category, price, ingredients } = request.body
        const  dish_id  = request.params.id

        const dishRepository = new DishRepository()
        const dishUpdateService = new DishUpdateService(dishRepository)

        await dishUpdateService.execute({ id: dish_id, title, description, category, price, ingredients})

        return response.status(201).json()
    }
    async show(request, response){
        const { id } = request.params

        const dishRepository = new DishRepository()
        const ingredientRepository = new IngredientRepository()
        const dishShowService = new DishShowService(dishRepository, ingredientRepository)

        const showList = await dishShowService.execute({ id })

        return response.status(200).json(showList)
    }
    async delete(request, response){
        const { id } = request.params

        const dishRepository = new DishRepository()
        const dishDeleteService = new DishDeleteService(dishRepository)

        await dishDeleteService.execute({ id })

        return response.status(204).json()
    }
    async index(request, response){
        const { title, ingredients } = request.query
        
        const dishRepository = new DishRepository() 
        const dishIndexService = new DishIndexService(dishRepository)

        const dishesWithIngredients = await dishIndexService.execute({ title, ingredients })
        
        return response.json(dishesWithIngredients)
    }
}
module.exports = DishesController