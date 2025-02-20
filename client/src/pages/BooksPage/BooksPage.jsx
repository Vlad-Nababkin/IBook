import { useEffect, useState } from "react"

import BookForm from "../../widgets/BookForm/BookForm";
import { BookApi } from "../../entities/book/BookApi";
import BookList from "../../widgets/BookList/BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
		BookApi.getAll().then(setBooks)
	}, [])
return(
  <>
  <h2>страничка создания и отрисовки существующих</h2>
  <BookForm setBooks = {setBooks} />
  <BookList books={books} setBooks={setBooks}/>
  </>
)
}
