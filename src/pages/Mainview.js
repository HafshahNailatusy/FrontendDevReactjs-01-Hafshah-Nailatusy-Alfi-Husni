import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MainView = () => {
  const [restaurList, setRestaurList] = useState([]);
  const [restaurDetail, setRestaurDetail] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openNow, setOpenNow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://restaurant-api.dicoding.dev/list`);
      setRestaurList(response.data.restaurants);
      
      setFilteredRestaurants(response.data.restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchResDetail = async (restoId) => {
    try {
      const response = await axios.get(
        `https://restaurant-api.dicoding.dev/detail/${restoId}`
      );
      return response.data.restaurant;
    } catch (error) {
      console.error("Error fetching restaurant detail:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRestoDetails = async () => {
      const detailRestaurants = await Promise.all(
        restaurList.map((resto) => fetchResDetail(resto.id))
      );
      setRestaurDetail(detailRestaurants);
      filterRestaurants(detailRestaurants); // Filter restaurants after fetching details
    };

    if (restaurList.length > 0) {
      fetchRestoDetails();
    }
  }, [restaurList]);

  const findRestItem = (restoId) => {
    return restaurDetail.find((item) => item.id === restoId);
  };

  useEffect(() => {
    filterRestaurants();
  }, [priceFilter, categoryFilter, openNow]);

  const handleFilterChange = (price, category, isOpenNow) => {
    setPriceFilter(price);
    setCategoryFilter(category);
    setOpenNow(isOpenNow);
  };

  const handleClearFilters = () => {
    setPriceFilter('');
    setCategoryFilter('');
    setOpenNow(false);
    filterRestaurants();
  };

  const filterRestaurants = (details = restaurDetail) => {
    let filtered = restaurList;

    if (priceFilter) {
      filtered = filtered.filter(resto => findRestItem(resto.id)?.priceRange === priceFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(resto => findRestItem(resto.id)?.categories.some(category => category.name === categoryFilter));
    }

    if (openNow) {
      const currentTime = new Date().getHours();
      filtered = filtered.filter(resto => {
        const openingHours = findRestItem(resto.id)?.operational?.hours;
        if (openingHours) {
          const { from, to } = openingHours;
          return currentTime >= from && currentTime <= to;
        }
        return false;
      });
    }

    setFilteredRestaurants(filtered);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? "#ffc107" : "#e4e5e9"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container">
      <br />
      <nav>
        <h1 className="navname">Restaurant</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </nav>
      <Filter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      <div className="row">
        {filteredRestaurants.map((resto) => (
          <div className="col-md-3 mb-3" key={resto.id}>
            <div className="card">
              <div className="card-body">
                <img
                  src={
                    resto.pictureId
                      ? `https://restaurant-api.dicoding.dev/images/small/${resto.pictureId}`
                      : "default-image.jpg"
                  }
                  className="img"
                  alt={resto.name || "No name available"}
                  height="200"
                  width="270"
                />
                <h2 className="card-title">
                  {resto.name || "No name available"}
                </h2>
                <h5 className="card-text">
                  {resto.city || "No city available"}
                </h5>
                <rating className="bintang">
                  {renderStars(resto.rating || 0)}
                </rating>
                {findRestItem(resto.id) ? (
                  <div>
                  <h6 className="kategoriw">Categories:</h6>
                  <div className="kategoriw">
                    {findRestItem(resto.id).categories.map((category, index) => (
                      <p key={index} className="kategori-item">{category.name}</p>
                    ))}
                  </div>
                </div>
                
                ) : (
                  <p>No categories available</p>
                )}
                <h6 className="pricecard">
                  Price Range: {findRestItem(resto.id)?.priceRange || "$No price range"}
                </h6>
                <h5 className="status">
                  Status: {openNow ? "Open Now" : "Closed"}
                </h5>
                <Link to={`/detail/${resto.id}`} className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainView;
