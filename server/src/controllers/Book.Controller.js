const BookService = require('../services/Book.service');
const formatResponse = require('../utils/formatResponse');

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await BookService.getAll();
      if (books.length === 0) {
        return res.status(204).json(formatResponse(204, 'No books found'));
      }
    } catch ({ message }) {
      res.status(500).json(500, 'Internal server error(getAllBooks)', null, message);
    }
  }
}

module.exports = BookController;
