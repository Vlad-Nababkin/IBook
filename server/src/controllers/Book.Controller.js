/* eslint-disable no-unused-vars */
const BookService = require('../services/Book.service');
const BookValidator = require('../utils/Book.validator');
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
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  // одна
  static async getById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid book ID'));
    }

    try {
      const book = await BookService.getById(reformatId(id));

      if (!book) {
        return res.status(404).json(formatResponse(404, `Book with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', book));
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  // создать
  static async createBook(req, res) {
    
    const {id}=res.locals.user
    const { title, author, user_comment, book_cover } = req.body;

// console.log(res.locals.user.id);


    const { isValid, error } = BookValidator.validate({
      title,
      author,
      user_comment,
    });
    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      
      
      const newBook = await BookService.create({
        title,
        author,
        user_comment,
        book_cover,
        user_id:id
      });
      console.log(newBook, '<<<<<<<<<<<<<<<<<<<<<<<');
      // console.log("===>>>");
      if (!newBook) {
        return res.status(400).json(formatResponse(400, `Failed to create new Book`));
      }

      res.status(201).json(formatResponse(201, 'success', newBook));
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  // обновить
  static async updateBook(req, res) {
    const {user}=res.locals
    const { id } = req.params;
    const { title, author, user_comment, book_cover, user_id } = req.body;
    

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid book ID'));
    }
    const { isValid, error } = BookValidator.validate({
      title,
      author,
      user_comment,
    });
    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }
    try {

      // книга по id
      const bookToUpdate = await BookService.getById(+id)
      
      if(bookToUpdate.user_id !== user.id){
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `No rights to update book with id ${id}`,
              null,
              `No rights to update book with id ${id}`
            )
          );
      }
      
      const updateBook = await BookService.update(+id, {
        title,
        author,
        user_comment,
        book_cover,
        user_id:user.id,
      });
      res.status(200).json(formatResponse(200, 'Updated', updateBook));
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  // удалить
  static async deleteBookById(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid book ID'));
    }

    try {
      // * Получаем книгу по id
      const bookToDelete = await BookService.getById(+id);

      // ! Если запрашивающий операцию юзер и владелец не сходятся, выбрасываем ошибку
      if (bookToDelete.user_id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `No rights to delete book with id ${id}`,
              null,
              `No rights to delete book with id ${id}`,
            ),
          );
      }
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const deletedBook = await BookService.delete(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!deletedBook) {
        return res.status(404).json(formatResponse(404, `Book with id ${id} not found`));
      }

      res
        .status(200)
        .json(
          formatResponse(200, `Book with id ${id} successfully deleted`, deletedBook),
        );
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = BookController;
