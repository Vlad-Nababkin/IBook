const router = require('express').Router()
const BookController = require('../controllers/Book.Controller')

router
	// не забыть добавить верификацию токенов по логике
	.get('/', BookController.getAllBooks)
	.get('/:id', BookController.getBookById)
	.post('/', BookController.createBook)
	.put('/:id', BookController.updateBook)
	.delete('/:id', BookController.deleteBookById)

module.exports = router
