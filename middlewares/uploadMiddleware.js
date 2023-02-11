const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {        
        cb(null, file.originalname)
    }
});

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware;