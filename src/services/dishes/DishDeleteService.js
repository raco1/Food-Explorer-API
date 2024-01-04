class DishDeleteService{
    constructor(dishRepository){
        this.dishRepository = dishRepository
    }
    async execute({ id }){
        await this.dishRepository.delete({ id })
    }
}
module.exports = DishDeleteService