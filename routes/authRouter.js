const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionCtrl,
  updateAvatarController,
  registrationConfirmationCtrl
} = require("../controllers/authController");
const {
  userRegisterValidation,
  userLoginValidation,
  userSubscriptionValidation  
} = require("../middlewares/authValidationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

router.post("/signup", userRegisterValidation, asyncWrapper(registrationController));
router.post("/login", userLoginValidation, asyncWrapper(loginController));
router.get("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch("/", authMiddleware, userSubscriptionValidation, asyncWrapper(changeSubscriptionCtrl));
router.patch("/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);
router.get("/verify/:verificationToken", asyncWrapper(registrationConfirmationCtrl));

module.exports = router;
