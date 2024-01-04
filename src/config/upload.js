const multer = require("multer")
const path = require('path')
const crypto = require('crypto')

const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'temp')
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, 'uploads')
const MULTER = {
    storage: multer.diskStorage({
        destination: TEMP_FOLDER,
        filename(req, file, callback){
            const hashFile = crypto.randomBytes(10).toString('hex')
            const fileName = `${hashFile}-${file.originalname}`
            return callback(null, fileName)
        }
    })
}
module.exports = {
    TEMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}