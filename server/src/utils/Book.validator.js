class BookValidator {
  static validate(data) {
    const { title, author, user_comment} = data;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      // Если title отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Title is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }

    if (!author || typeof author !== 'string' || author.trim() === '') {
      return {
        isValid: false, // Данные невалидные
        error: 'Title is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }
    if (!user_comment || typeof user_comment !== 'string' || user_comment.trim() === '') {
      return {
        isValid: false, // Данные невалидные
        error: 'Title is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
      };
    }
    return { isValid: true, error: null };
  }
}

module.exports = BookValidator;
