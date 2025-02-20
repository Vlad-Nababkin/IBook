import { useEffect, useState } from "react"

import BookForm from "../../widgets/BookForm/BookForm";
import { BookApi } from "../../entities/book/BookApi";

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
  <h2>книжки</h2>
  <BookForm setBooks = {setBooks} />
  </>
)
}
