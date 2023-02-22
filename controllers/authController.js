const {
    registration,
    registrationConfirmation,
    login,
    logout,
    current,
    changeSubscription,
    updateAvatar
} = require("../services/authService");

const registrationController = async (req, res) => {
    const {email, password} = req.body;
    const user = await registration(email, password);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
            verificationToken: user.verificationToken
        }
    })
}

const registrationConfirmationCtrl = async (req, res) => {    
    const {verificationToken} = req.params;    
    const result = await registrationConfirmation(verificationToken);
    res.json({result})
}

const loginController = async (req, res) => {
    const {email, password} = req.body;
    const { token, user } = await login(email, password);
    res.json({ token, user: {
            email: user.email,
            subscription: user.subscription
        }  })
}

const logoutController = async (req, res) => { 
    const { _id } = req.user;
    await logout(_id)
    // await User.findByIdAndUpdate(_id, { token: null });    
    res.status(204).json()
}

const currentUserController = async (req, res) => {
    // console.log("currentUserController");
    const { _id } = req.user;
    const user = await current(_id);
    const {email, subscription} = user
    res.json({ email, subscription  })
}
 
const changeSubscriptionCtrl = async (req, res) => {    
    const { _id } = req.user;
    const { subscription } = req.body
    const user = await changeSubscription(_id, subscription)
    res.json({ email: user.email, subscription: user.subscription  })
}

const updateAvatarController = async (req, res) => {
    const { _id } = req.user;
    const file = req.file
    const user = await updateAvatar(_id, file);
    res.json({ avatarURL: user.avatarURL  })    
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentUserController,
    changeSubscriptionCtrl,
    updateAvatarController,
    registrationConfirmationCtrl,    
}