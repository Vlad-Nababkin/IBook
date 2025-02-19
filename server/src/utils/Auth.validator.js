class AuthValidator {
	static validateSignUp({ username, email, phone_number, password }) {
		if (
			!username ||
			username.trim().length === 0 ||
			typeof username !== 'string'
		) {
			return {
				isValid: false,
				error: 'Username is required and must non-empty string',
			}
		}

		if (
			!email ||
			email.trim().length === 0 ||
			typeof email !== 'string' ||
			!this.validateEmail(email)
		) {
			return {
				isValid: false,
				error:
					'Email is required and must non-empty string and must be valid email',
			}
		}
		if (
			!password ||
			password.trim().length === 0 ||
			typeof password !== 'string' ||
			!this.validatePassword(password)
		) {
			return {
				isValid: false,
				error:
					'Password is required, must be a non-empty string, contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
			}
		}

		if (
			!phone_number ||
			phone_number.trim().length === 0 ||
			typeof phone_number !== 'number' ||
			!this.validatePhoneNumber(phone_number)
		) {
			return {
				isValid: false,
				error: 'The phone number field must contain at least 10 digits.',
			}
		}

		return {
			isValid: true,
			error: null,
		}
	}

	static validateSignIn({ email, password }) {
		if (!email || email.trim().length === 0 || typeof email !== 'string') {
			return {
				isValid: false,
				error: 'Email is required and must non-empty string.',
			}
		}

		if (
			!password ||
			password.trim().length === 0 ||
			typeof password !== 'string'
		) {
			return {
				isValid: false,
				error: 'Password is required, must be a non-empty string.',
			}
		}

		return {
			isValid: true,
			error: null,
		}
	}

	static validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return emailPattern.test(email)
	}

  static validatePassword(password) {
    const isValidLenght = password.length >= 6
    if (!isValidLenght) {
    return false 
  } else {
      return true
    }
  }
}

module.exports = AuthValidator
