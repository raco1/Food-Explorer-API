const { Router } = require('express')
const DishesController = require('../controllers/DishesController')
const DishesImageController = require('../controllers/DishesImageController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const adminOnlyAuthtorization = require('../middleware/adminOnlyAuthorization')
const multer = require("multer")
const uploadConfig = require("../config/upload")

const dishesRoutes = Router()
const dishesImageController = new DishesImageController()
const dishesController = new DishesController()
const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', adminOnlyAuthtorization, dishesController.delete)
dishesRoutes.post('/', adminOnlyAuthtorization, upload.single("image"), dishesController.create)
dishesRoutes.put('/:id', adminOnlyAuthtorization, upload.single("image"), dishesController.update)
dishesRoutes.patch('/image/:id', adminOnlyAuthtorization, upload.single("image"), dishesImageController.update)

module.exports = dishesRoutes