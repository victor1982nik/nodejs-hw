const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.resolve("public/avatars");

const uploadController = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarsDir, originalname);
    // console.log("tempUpload", tempUpload)
    // console.log("resultUpload", resultUpload)
    try {
        await fs.rename(tempUpload, resultUpload)
    } catch (e) {
        await fs.unlink(tempUpload)
    }
     
    res.json({status: 'success'})
}


module.exports = {
    uploadController    
}