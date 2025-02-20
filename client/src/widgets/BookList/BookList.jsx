import BookCard from '../BookCard';

export default function BookList({ books, setBooks }) {
  return (
    <div>
      список постов о книжках
      {books ? (
        books.map((book) => <BookCard key={book.id} book={book} setBooks={setBooks} />)
      ) : (
        <p>постов о книгах не найдено</p>
      )}
    </div>
  );
}
