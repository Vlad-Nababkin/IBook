const AuthController = require('../controllers/Auth.Controller')
const verifyRefreshToken = require('../middleware/verifyRefreshToken')
const router = require('express').Router()

router.get('/refreshToken', verifyRefreshToken, AuthController.refreshToken)
router.post('/signUp', AuthController.signUp)
router.post('/signIn', AuthController.signIn)
router.get('/signOut', AuthController.signOut)

module.exports = router
