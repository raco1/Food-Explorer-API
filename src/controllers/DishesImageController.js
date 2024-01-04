const DiskStorage = require("../providers/DiskStorage")
const knex = require("../database/knex")

class DishImageController {
    async update(request, response){
        const dish_id = request.params.id
        const imageFileName = request.file.filename
        const dish = await knex("dishes").where({ id: dish_id }).first()

        const diskStorage = new DiskStorage()

        if(dish.image){
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(imageFileName)
        dish.image = filename

        await knex("dishes").update(dish).where({ id: dish_id })

        return response.status(201).json(dish)
    }
}

module.exports = DishImageController