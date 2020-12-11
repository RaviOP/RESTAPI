const router = require('express').Router()
const auth = require('../middlewares/auth')

const {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutUserAllDevice } = require('../controllers/userController')

//SIGN-UP USERS --> Create
router.post('/users', createUser)

//READ USER 
router.get('/users/me', auth,readUser)

//UPDATE USER
router.patch('/users/me', auth, updateUser)

//DELETE USER
router.delete('/users/me', auth, deleteUser)

//LOGIN USER
router.post('/users/login', loginUser)

//LOGOUT USER FROM CURRENT DEVICE
router.post('/users/logout', auth,logoutUser)

//LOGOUT USER FROM ALL DEVICES
router.post('/users/logoutAll', auth,logoutUserAllDevice)

module.exports = router
