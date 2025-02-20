const router = require('express').Router()
const BookController = require('../controllers/Book.Controller')
const verifyAccessToken = require('../middleware/verifyAccessToken')

router
	// не забыть добавить верификацию токенов по логике
	.get('/', BookController.getAllBooks)
	.get('/:id', BookController.getById)
	.post('/', verifyAccessToken, BookController.createBook)
	.put('/:id', verifyAccessToken,BookController.updateBook)
	.delete('/:id', verifyAccessToken,BookController.deleteBookById)

module.exports = router
