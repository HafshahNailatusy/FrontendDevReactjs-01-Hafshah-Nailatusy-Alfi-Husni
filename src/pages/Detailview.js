import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const DetailView = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`https://restaurant-api.dicoding.dev/detail/${id}`);
      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error('Error fetching the data', error);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faStar} 
          className={i < rating ? 'star-filled' : 'star-empty'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="container">
      <h1 className='namares'>{restaurant.name}</h1>
      <div>
        <img 
          src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`} 
          alt={restaurant.name}
          className='imgeres' 
        />
      </div>
      <div className='des'>{restaurant.description}</div>
      <div className='siti'>City: {restaurant.city}</div>
      <div className='addr'>Address: {restaurant.address}</div>
      <div className='rat'>
        Rating: {renderRatingStars(Math.round(restaurant.rating))}
        <span className='rating-number'>({restaurant.rating})</span>
      </div>
      <h3 className='cat'>Categories: </h3>
      <ul>
        {restaurant.categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
      <h3>Menus: </h3>
      <div className='divfood'>
        <h2>Foods: </h2>
        <ul>
          {restaurant.menus.foods.map((food, index) => (
            <li key={index}>{food.name}</li>
          ))}
        </ul>
      </div>
      <div className='divdrink'>
        <h2>Drinks: </h2>
        <ul>
          {restaurant.menus.drinks.map((drink, index) => (
            <li key={index}>{drink.name}</li>
          ))}
        </ul>
      </div>
      <h3>Reviews: </h3>
      <div className='reviews'>
        <ul>
          {restaurant.customerReviews.map((review, index) => ( 
            <li key={index}>
              <p>{review.name} - {review.date}</p>
              <p>{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailView;
