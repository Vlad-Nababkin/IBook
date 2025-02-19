const { Book } = require('../db/models');

class BookService {
  static async getAll() {
    return await Book.findAll();
   
  }

  static async getBookById(id){
    return await Book.findByPk(id)
  }
}

module.exports = BookService;
