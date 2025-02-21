import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookApi } from '../../entities/book/BookApi';
import styles from './OneBookPage.module.css'

export default function OneBookPage() {
  const { id } = useParams();

  const [book, setBook] = useState({
    title: '',
    author: '',
    user_comment: '',
    book_cover: '',
    user_id: id,
  });

  const [isEdit, setIsEdit] = useState(false);

  // каждый раз при изменении id
  useEffect(() => {
    BookApi.getById(+id).then(({ statusCode, error, data, message }) => {
      if (error) alert(message);
      if (statusCode === 200) setBook(data);
    });
  }, [id]);

  //редактируем по нажатию на кнопку
  async function editHandler() {
    setIsEdit(true);
  }

  //

  // обрабатываем поля
  function handlerTitleChange(e) {
    setBook({ ...book, title: e.target.value });
  }

  function handlerAuthorChange(e) {
    setBook({ ...book, author: e.target.value });
  }

  function handlerUserCommentChange(e) {
    setBook({ ...book, user_comment: e.target.value });
  }

  function handlerBookCover(e) {
    setBook({ ...book, book_cover: e.target.value });
  }
  // записываем новые данные
  async function saveHandler() {
    // console.log( "<<<<<========");
    const response = await BookApi.update(id,book);
    // console.log(response, "<<<<<========");
    
    if (response.statusCode === 200) {
      alert('обновлено');
      setIsEdit(false);
    } else {
      alert(response.message);
    }
  }

  return (
    <div className={styles.oneBookContainer}>
      {isEdit ? (
        <>
          <input
          className={styles.inputField}
            type="text"
            value={book.title}
            onChange={handlerTitleChange}
            placeholder="Название книги"
            
          />
          <input
            type="text"
            value={book.author}
            onChange={handlerAuthorChange}
            placeholder="Автор"
            className={styles.inputField}
          />
          <textarea
            value={book.user_comment}
            onChange={handlerUserCommentChange}
            placeholder="Комментарий"
            className={styles.textArea}
          />
          <input
            type="text"
            value={book.book_cover}
            onChange={handlerBookCover}
            placeholder="Ссылка на обложку"
            className={styles.inputField}
          />
          <button onClick={saveHandler} className={styles.saveButton}>
            Сохранить
          </button>
        </>
      ) : (
        <>
          <h3 className={styles.title}>{book.title}</h3>
          <h3 className={styles.author}>{book.author}</h3>
          <h3 className={styles.comment}>{book.user_comment}</h3>
          {book.book_cover && (
            <img
              src={book.book_cover}
              alt={`Обложка книги ${book.title}`}
              className={styles.bookCover}
            />
          )}
          <button onClick={editHandler} className={styles.editButton}>
            Редактировать
          </button>
        </>
      )}
    </div>
  );

}
