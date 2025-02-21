/* eslint-disable react/prop-types */
// import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { BookApi } from '../entities/book/BookApi';

export default function BookCard({ book, setBooks }) {
  // let navigate = useNavigate();

  async function deleteButtonHandler() {
    try {
      // удаляем
      const { message, error, statusCode } = await BookApi.delete(book.id);
      if (error) {
        alert(message);
      }
      // рендерим без удаленной
      if (statusCode === 200) {
        setBooks(prev => prev.filter(el => el.id !== book.id))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
		<div>
			BookCard
			<Link to={`/books/${book.id}`}>
				<h3>{book.title}</h3>
			</Link>
			<h3>{book.user_comment}</h3>
			<button type='button' onClick={deleteButtonHandler}>
				удалить пост
			</button>
		</div>
	)
}
