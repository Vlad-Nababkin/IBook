import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookApi } from '../../entities/book/BookApi';


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
    console.log( "<<<<<========");
    const response = await BookApi.update(id,book);
    console.log(response, "<<<<<========");
    
    if (response.statusCode === 200) {
      alert('обновлено');
      setIsEdit(false);
    } else {
      alert(response.message);
    }
  }

  return (
    <div>
      {isEdit ? (
        <>
          <input
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
          />
          <textarea
            value={book.user_comment}
            onChange={handlerUserCommentChange}
            placeholder="Комментарий"
          />
          <input
            type="text"
            value={book.book_cover}
            onChange={handlerBookCover}
            placeholder="Ссылка на обложку"
          />
          <button onClick={saveHandler}>Сохранить</button>
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <h3>{book.author}</h3>
          <h3>{book.user_comment}</h3>
          {book.book_cover && (
            <img
              src={book.book_cover}
              alt={`Обложка книги ${book.title}`}
              style={{ width: '200px', height: 'auto' }}
            />
          )}
          <button onClick={editHandler}>Редактировать</button>
        </>
      )}
    </div>
  );
}
