const {Book} = require('../db/books')


class BookService{
static async getAll(){
  return await Book.findAll()
}

}



module.exports = BookService