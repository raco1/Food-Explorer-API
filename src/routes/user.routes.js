const { Router } = require('express')
const UserController = require('../controllers/UserController')
const UsersValidatedController = require('../controllers/UsersValidatedController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const userRoutes = Router()
const userController = new UserController()
const usersValidatedController = new UsersValidatedController()

userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuthenticated, userController.update)
userRoutes.get('/validated', ensureAuthenticated, usersValidatedController.index)

module.exports = userRoutes