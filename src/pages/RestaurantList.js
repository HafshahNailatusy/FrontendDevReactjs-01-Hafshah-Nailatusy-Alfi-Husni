import React from 'react';

const RestaurantList = ({ restaurants }) => {
  if (restaurants.length === 0) {
    return <div>No restaurants found</div>;
  }

  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant">
          <h2>{restaurant.name}</h2>
          <p>Category: {restaurant.category}</p>
          <p>Price: {restaurant.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
