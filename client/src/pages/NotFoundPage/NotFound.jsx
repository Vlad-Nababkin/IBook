import React from 'react';

import '../../pages/PageStyles/NotFoundStyle.css'
export default function NotFound() {
    return (
        <div className='not-found-container'>
            <h1 className='not-found-text'>404 - Страница не найдена</h1>
            <p className='not-found-text'>Извините, но запрашиваемая страница не существует.</p>
            <a href="/" className='not-found-link'>Вернуться на главную страницу</a>
        </div>
    );
};