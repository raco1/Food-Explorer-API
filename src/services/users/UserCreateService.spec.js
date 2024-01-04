const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../../repositories/users/UserRepositoryInMemory')
const AppError = require("../../utils/AppError");


describe("UserCreateService", () => {
    let userRepositoryInMemory 
    let userCreateService 

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })
    
    it("user should be created", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123456"
        }    
        const userCreated = await userCreateService.execute(user)      
        expect(userCreated).toHaveProperty("id")
    })
    it("user should not be created with an existing e-mail address", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user1@test.com",
            password: "123456"
        }
        const user2 = {
            name: "User Test 2",
            email: "user1@test.com",
            password: "456789"
        }
        await userCreateService.execute(user1)
        await expect(userCreateService.execute(user2.email)).rejects.toEqual(new AppError("E-mail já cadastrado. Use um e-mail diferente ou faça o login."))    
    })
})