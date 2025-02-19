const { Book } = require('../db/models');

class BookService {
  static async getAll() {
    return await Book.findAll();
  }

  static async getBookById(id) {
    return await Book.findByPk(id);
  }

  static async create({ title, author, user_comment, book_cover, user_id }) {
    return await Book.create({ title, author, user_comment, book_cover, user_id });
  }

  static async update(id, data) {
    // console.log(id,data);
    const book = await Book.findByPk(id);

    if (book) {
      (book.title = data.title),
        (book.author = data.author),
        (book.user_comment = data.user_comment),
        (book.book_cover = data.book_cover);
      await book.save();
    }
    // const updateBook = await   Book.update(data,{where:{
    //   id:id
    // }})
    // console.log(updateBook);

    return book;
  }
}

module.exports = BookService;
