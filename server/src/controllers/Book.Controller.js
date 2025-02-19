const BookService = require('../services/Book.service');
const formatResponse = require('../utils/formatResponse');

class BookController {

  static async getAllBooks(req, res) {
    try {
      const books = await BookService.getAll();
     
      if (books.length === 0) {
        return res.status(204).json(formatResponse(204, 'No books found'));
      }
      // console.log('==>>>',books);
      res.status(200).json(formatResponse(200, 'success', books));

    } catch (error) {
      res.status(500).json(500, 'Internal server error(getAllBooks)', null, error);
    }
  }

  static async getBookBy
}

module.exports = BookController;
