import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <React.Fragment>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='whoops missing image ;('
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <p className='cards__item__info'>{props.contact}</p>

          </div>
        </Link>
      </li>
    </React.Fragment>
  );
}

export default CardItem;