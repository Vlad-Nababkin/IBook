import { useEffect, useState } from 'react'
import { BookApi } from '../../entities/book/BookApi'
import './MainPage.css'

export default function MainPage() {
	const [book, setBook] = useState([])

	useEffect(() => {
		BookApi.getAll().then(setBook)
	}, [])
	return (
		<div className='book-list'>
			{book.map(el => (
				<div key={el.id} className='book-item'>
					{el.book_cover && (
						<img src={el.book_cover} alt={`Обложка книги ${el.title}`} />
					)}
					<div className='book-info'>
						<h3>{el.title}</h3>
						<h4>{el.author}</h4>
						<p>{el.user_comment}</p>
					</div>
				</div>
			))}
		</div>
	)
}
