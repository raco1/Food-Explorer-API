class DishIndexService{
    constructor(dishRepository){
        this.dishRepository = dishRepository
    }
    async execute({ title, ingredients }){
        return await this.dishRepository.index({title, ingredients})
    }
}
module.exports = DishIndexService