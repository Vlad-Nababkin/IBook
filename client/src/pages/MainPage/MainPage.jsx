import { useEffect, useState } from 'react'
import { BookApi } from '../../entities/book/BookApi'

export default function MainPage() {
	const [book, setBook] = useState([])

	useEffect(() => {
		BookApi.getAll().then(setBook)
	}, [])
	return (
		<div>
			{book.map(el => (
				<div key={el.id}>
					<h3>{el.title}</h3>
					<h4>{el.author}</h4>
					<p>{el.user_comment}</p>
					{el.book_cover && (
						<img
							src={el.book_cover}
							alt={`Обложка книги ${el.title}`}
							style={{ width: '200px', height: 'auto' }}
						/>
					)}
				</div>
			))}
		</div>
	)
}
