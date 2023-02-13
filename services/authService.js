const { User } = require("../db/userModel");
const { NotAutorizedError, ConflictError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.resolve("public/avatars");

const registration = async (email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ConflictError(`"Email ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const user = new User({
    email,
    password,
    avatarURL,
  });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError(`Email or password is wrong`);
  }  
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1w" }
  );
  user.token = token;
  await user.save();
  return { token, user };
};

const logout = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
  return { message: "success" };
};

const current = async (_id) => {
  return await User.findById(_id);
};

const changeSubscription = async (_id, subscription) => {
  console.log("subscription", subscription);
  return await User.findByIdAndUpdate(_id, { subscription }, { new: true });
};

const updateAvatar = async (_id, file) => {
  const { path: tempUpload, originalname } = file;
  const resultUpload = path.join(avatarsDir, originalname);
  const name = `${_id}-${originalname}`;
  const avatarURL = path.join("public", "avatars", name);

  try {
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(tempUpload);
    await fs.rename(tempUpload, resultUpload);        
    return await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });    
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }    
};

module.exports = {
  registration,
  login,
  logout,
  current,
  changeSubscription,
  updateAvatar,
};
