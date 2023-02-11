const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const tempDir = path.resolve("tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {        
        cb(null, file.originalname)
    }
});

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  uploadController,  
} = require("../controllers/filesController");

const uploadMiddleware = multer({storage})

router.post("/upload", uploadMiddleware.single("avatar"), asyncWrapper(uploadController));
// router.use("/download", express.static(tempDir));

module.exports = router;
