import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Meet the team!</h1>
      <p></p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/'
              text='Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah'
              contact='Contact me@'
              label='Dewan Sunnah'
              contact='Email: unknown'
              path='/aboutus'
            />
             <CardItem
              src='images/Dibba_aboutus3.jpeg'
              text='Hey im Dibba! Throughout college, Ive focused on building mobile applications - but now Im exploring more fullstack web development. For this project I worked on the frontend side of things with the use of ReactJS.'
              label='Dibba Roy'
              contact='Email: Roydibba@gmail.com'
              path='/aboutus'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Jordan_aboutus.jpeg'
              text='Hey! Im Jordan and Im an aspiring fullstack developer. For this project I focused more on the frontend for this site using ReactJS.'
              label='Jordan Sze'
              contact='Email: jsze5341@gmail.com'
              path='/aboutus'
            />
            <CardItem
              src='images/emran_aboutus.png'
              text='Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah'
              label='Shu Qiang Qu'
              contact='Email: unknown'
              path='/aboutus'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/kento_aboutus.jpeg'
              text='Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah'
              label='Ivan Yatsko'
              contact='Email: unknown'
              path='/aboutus'
            />
            <CardItem
              src='images/emran_aboutus.png'
              text='Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah Blah blah blah blah'
              label='Our Professor'
              contact='Email: unknown'
              path='/aboutus'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
