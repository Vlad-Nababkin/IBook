const BookService = require('../services/Book.service');
const formatResponse = require('../utils/formatResponse');
const isValidId = require('../utils/isValidId');
const reformatId = require('../utils/reformatId');

class BookController {
  // все
  static async getAllBooks(req, res) {
    try {
      const books = await BookService.getAll();

      if (books.length === 0) {
        return res.status(204).json(formatResponse(204, 'No books found'));
      }
      // console.log('==>>>',books);
      res.status(200).json(formatResponse(200, 'success', books));
    } catch ({ message }) {
      res.status(500).json(500, 'Internal server error(getAllBooks)', null, message);
    }
  }
  // одна
  static async getBookById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid book ID'));
    }

    try {
      const book = await BookService.getBookById(reformatId(id));

      if (!book) {
        return res.status(404).json(formatResponse(404, `Book with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', book));
    } catch ({ message }) {
      res.status(500).json(500, 'Internal server error(getBookById)', null, message);
    }
  }
}

module.exports = BookController;
