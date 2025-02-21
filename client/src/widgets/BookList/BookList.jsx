/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import BookCard from '../BookCard';
import styles from './BookList.module.css';
import { useNavigate } from 'react-router';



export default function BookList({ books, setBooks, user, setUser }) {
  
  const navigate = useNavigate()
  return (
    <div className={styles.bookListContainer}>
      <div className={styles.listHeader}>Твой список постов о книжках</div>
      {books && books.length > 0 ? (
        books.map((book) => (
          
          <div key={book.id} className={styles.bookCard}>
            <BookCard book={book} setBooks={setBooks} navigate={navigate} />
          </div>
        ))
      ) : (
        <p>Постов о книгах не найдено</p>
      )}
    </div>
  );
}
