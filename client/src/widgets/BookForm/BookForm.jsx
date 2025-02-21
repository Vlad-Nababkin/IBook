/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BookApi } from '../../entities/book/BookApi';
import styles from './BookForm.module.css'

export default function BookForm({ books,setBooks }) {
  
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    user_comment: '',
    book_cover: '',
  });

  const [error, setError] = useState('');

  // изменение поля ввода
  async function onChangeHandler(event) {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  // обработчик формы
  async function onSubmitHandler(event) {
    event.preventDefault();

    if (!inputs.title || inputs.title.length === 0) {
      setError('нужно заполнить');
      return;
    }
    if (!inputs.author || inputs.author.length === 0) {
      setError('нужно заполнить');
      return;
    }
    if (!inputs.user_comment || inputs.user_comment.length === 0) {
      setError('нужно заполнить');
      return;
    }

    try {
      const { message, error, data, statusCode } = await BookApi.create(inputs);

      if (error) {
        setError(message);
      }

      if (statusCode === 201) {
        setBooks((prev) => [...prev, data]);
        setInputs({ title: '', author: '', user_comment: '', book_cover: 'обложки нет' });
        setError('');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
<form onSubmit={onSubmitHandler} className={styles.bookForm}>
      <h2>Создай свой новый пост здесь</h2>
      <input
        name="title"
        placeholder="title"
        value={inputs.title}
        onChange={onChangeHandler}
        className={styles.inputField}
      />
      <input
        name="author"
        placeholder="author"
        value={inputs.author}
        onChange={onChangeHandler}
        className={styles.inputField}
      />
      <textarea
        name="user_comment"
        placeholder="your comment"
        value={inputs.user_comment}
        onChange={onChangeHandler}
        rows={4}
        className={styles.textArea}
      />
      <input
        type="text"
        name="book_cover"
        placeholder="Вставь ссылку на обложку"
        value={inputs.book_cover}
        onChange={onChangeHandler}
        className={styles.inputField}
      />
      {inputs.book_cover && (
        <img
          src={inputs.book_cover}
          alt="Обложка книги"
          className={styles.bookImage}
        />
      )}
      <button type="submit" className={styles.submitButton}>
        создать пост о книжке
      </button>
      {error && <span className={styles.errorText}>{error}</span>}
    </form>
  );

}
