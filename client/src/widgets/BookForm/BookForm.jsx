import { useState } from 'react';
import { BookApi } from '../../entities/book/BookApi';

export default function BookForm({ setBooks }) {
  
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    user_comment: '',
    book_cover: 'обложки нет',
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
    <form onSubmit={onSubmitHandler}>
      BookForm
      <input
        name="title"
        placeholder="title"
        value={inputs.title}
        onChange={onChangeHandler}
      />
      <input
        name="author"
        placeholder="author"
        value={inputs.author}
        onChange={onChangeHandler}
      />
      <textarea
        name="user_comment"
        placeholder="your comment"
        value={inputs.user_comment}
        onChange={onChangeHandler}
        rows={4}
        style={{ width: '100%' }}
      />
      <input
        type="text"
        name="book_cover"
        placeholder="Вставь ссылку на обложку"
        value={inputs.book_cover}
        onChange={onChangeHandler}
      />
      {inputs.book_cover && (
        <img
          src={inputs.book_cover}
          alt="Обложка книги"
          style={{ width: '200px', height: 'auto', marginTop: '10px' }}
        />
      )}
      <button type="submit">создать пост о книжке</button>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
  );
}
