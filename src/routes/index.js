const userRoutes = require('./user.routes')
const sessionsRoutes = require('./session.routes')
const dishesRoutes = require('./dish.routes')
const ingredientsRoutes = require('./ingredient.routes')

const { Router } = require('express')
const routes = Router()

routes.use('/users', userRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes