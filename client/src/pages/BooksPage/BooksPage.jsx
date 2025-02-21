import { useEffect, useState } from 'react';

import BookForm from '../../widgets/BookForm/BookForm';
import { BookApi } from '../../entities/book/BookApi';
import BookList from '../../widgets/BookList/BookList';



export default function BooksPage({ user, setUser }) {
  const [books, setBooks] = useState([]);
  // console.log(user);
  
  
// console.log("======>>>",id);

  useEffect(() => {    
  
    BookApi.getAll().then((response)=>{
      // console.log(response,'<<<<<<');
      const userBooks = response.filter((book)=>book.user_id===user.id)
      setBooks(userBooks)
    })

  }, [user]);
  return (
    <>
      {/* <h2>страничка создания и отрисовки существующих</h2> */}
      {/* создание карточки */}
      <BookForm books={books} setBooks={setBooks} />
      {/* отрисовка всех карточек */}
      <BookList books={books} setBooks={setBooks} user = {user} setUser = {setUser} />
    </>
  );
}
