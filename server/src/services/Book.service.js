const { Book } = require('../db/models');

class BookService {
  static async getAll() {
    return await Book.findAll();
   
  }
}

module.exports = BookService;
