import { useEffect, useState } from "react"

import BookForm from "../../widgets/BookForm/BookForm";
import { BookApi } from "../../entities/book/BookApi";
import BookList from "../../widgets/BookList/BookList";

export default function BooksPage() {
  
  const [books, setBooks] = useState([])

  useEffect(() => {
    // от сервера придет промис, который сразу деструктурируем по ключам
    BookApi.getAll().then(({ data, message, error, statusCode }) => {
      if (error) {
        alert(message);
      }
      //обноволяем состояние
      setBooks(data);
    });
  }, []);
return(
  <>
  <h2>страничка создания и отрисовки существующих</h2>
  <BookForm setBooks = {setBooks} />
  <BookList books={books} setBooks={setBooks}/>
  </>
)
}
