const cookiesConfig = require('../config/cookiesConfig')
const formatResponse = require('../utils/formatResponse')
const generateTokens = require('../utils/generateTokens')
const AuthValidator = require('../utils/Auth.validator')
const UserService = require('../services/User.service')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

// try to fix
class AuthController {
	static async refreshToken(req, res) {
		try {
			const { user } = res.locals

			if (!user) {
				return res.status(400).json(formatResponse(400, 'User data is missing'))
			}

			const { accessToken, refreshToken } = generateTokens({ user })

			res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
				formatResponse(200, 'Token regenerated', {
					user,
					accessToken,
				})
			)
		} catch ({ message, stack }) {
			console.error('Error in refreshTokens:', message, stack)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async signUp(req, res) {
		const { email, username, password } = req.body

		const { isValid, error } = AuthValidator.validateSignUp({
			email,
			password,
			username,
		})

		if (!isValid) {
			return res
				.status(400)
				.json(formatResponse(400, 'inValid error', null, error))
		}

		const normalizedEmail = email.toLowerCase()
		try {
			const userFound = await UserService.getByEmail(normalizedEmail)

			if (userFound) {
				return res
					.status(400)
					.json(
						formatResponse(
							400,
							'User already exist',
							null,
							'User already exist'
						)
					)
			}
			const hashedPassword = await bcrypt.hash(password, 10)

			const newUser = await UserService.create({
				username,
				email: normalizedEmail,
				password: hashedPassword,
			})

			if (!newUser) {
				return res
					.status(400)
					.json(
						formatResponse(
							400,
							'Failed to register user',
							null,
							'Failed to register user'
						)
					)
			}

			const plainUser = newUser.get({ plain: true })
			delete plainUser.password

			const { accessToken, refreshToken } = generateTokens({
				user: plainUser,
			})

			res
				.status(201)
				.cookie('refreshToken', refreshToken, cookiesConfig)
				.json(
					formatResponse(201, 'Register successful', {
						user: plainUser,
						accessToken,
					})
				)
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, '======Internal server error', null, message))
		}
	}

	static async signIn(req, res) {
		const { email, password } = req.body

		const { isValid, error } = AuthValidator.validateSignIn({
			email,
			password,
		})

		if (!isValid) {
			res.status(400).json(formatResponse(400, 'Validation error', null, error))
		}

		const normalizedEmail = email.toLowerCase()
		try {
			const user = await UserService.getByEmail(normalizedEmail)

			if (!user) {
				return res
					.status(400)
					.json(formatResponse(400, 'User not found', null, 'User not found'))
			}

			const isPasswordValid = await bcrypt.compare(password, user.password)

			if (!isPasswordValid) {
				return res
					.status(400)
					.json(
						formatResponse(400, 'Invalid password', null, 'Invalid password')
					)
			}

			const plainUser = user.get({ plain: true })
			delete plainUser.password

			const { accessToken, refreshToken } = generateTokens({
				user: plainUser,
			})

			res
				.status(200)
				.cookie('refreshToken', refreshToken, cookiesConfig)
				.json(
					formatResponse(200, 'Login successful', {
						user: plainUser,
						accessToken,
					})
				)
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async signOut(req, res) {
		try {
			res
				.clearCookie('refreshToken')
				.json(formatResponse(200, 'Logout successfully'))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async forgotPassword(req, res) {
		const { email } = req.body

		try {
			const user = await UserService.getByEmail(email)
			if (!user) {
				return res
					.status(404)
					.json(formatResponse(404, 'User not found', null, 'User not found'))
			}

			const resetToken = crypto.randomBytes(20).toString('hex')
			const resetTokenExpiry = Date.now() + 3600000

			await UserService.update(user.id, { resetToken, resetTokenExpiry })

			const transporter = nodemailer.createTransport({
				service: 'Mail.ru',
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASS,
				},
			})

			const mailOptions = {
				to: user.email,
				from: process.env.EMAIL_USER,
				subject: 'Password Reset',
				text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                    Please click on the following link, or paste this into your browser to complete the process:\n\n
                    http://${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
			}

			await transporter.sendMail(mailOptions)

			res
				.status(200)
				.json(formatResponse(200, 'Reset email sent', null, 'Reset email sent'))
		} catch (error) {
			console.error(error)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, error.message))
		}
	}

	static async resetPassword(req, res) {
		const { token } = req.params
		const { password } = req.body

		try {
			const user = await UserService.getByResetToken(token)

			if (!user || user.resetTokenExpiry < Date.now()) {
				return res
					.status(400)
					.json(
						formatResponse(
							400,
							'Invalid or expired token',
							null,
							'Invalid or expired token'
						)
					)
			}

			const hashedPassword = await bcrypt.hash(password, 10)
			await UserService.update(user.id, {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			})

			res
				.status(200)
				.json(formatResponse(200, 'Password updated', null, 'Password updated'))
		} catch (error) {
			console.error(error)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, error.message))
		}
	}
}

module.exports = AuthController
