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
              src='images/temporaryaboutme.jpg'
              text='Hi,  my name is Dewan and Im an aspiring fullstack developer. Ive done work in mobile development, web development and even database development. For this project, Im focusing on improving my backend skills and helping out with the frontend when needed.'
              contact='Contact me@'
              label='Dewan Sunnah'
              contact='Email: dewansunnah613@gmail.com'
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
              src='images/Brian(1).png'
              text='For this project I worked on the land page informations blocks, market page and user marketpage using the IEXClous api for the data'
              label='Shu Qiang Qu'
              contact='Email: Shuqiangwu1@gmail.com'
              path='/aboutus'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/kento_aboutus.jpeg'
              text='Hey Im Ivan! For this project I worked on creating the database schema.'
              label='Ivan Yatsko'
              contact='Email: Ivan.Yatsko@gmail.com'
              path='/aboutus'
            />
            <CardItem
              src='images/emran_aboutus.png'
              text=''
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
