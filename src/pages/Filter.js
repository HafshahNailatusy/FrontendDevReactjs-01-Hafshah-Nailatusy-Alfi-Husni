import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './style.css'; // Ensure CSS file is imported
import Alert from 'react-bootstrap/Alert';

const Filter = ({ onFilterChange, onClearFilters }) => {
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openNow, setOpenNow] = useState(false);
  const [dataFound, setDataFound] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
 

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPriceFilter(price);
    onFilterChange(price, categoryFilter, openNow);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    onFilterChange(priceFilter, category, openNow);
  };

  const handleOpenNowChange = (e) => {
    const isOpenNow = e.target.checked;
    setOpenNow(isOpenNow);
    onFilterChange(priceFilter, categoryFilter, isOpenNow);
  };

  const handleClearFilters = () => {
    setPriceFilter('');
    setCategoryFilter('');
    setOpenNow(false);
    onClearFilters();
  };

  const handleFilterClick = () => {
    // Simulate no data found scenario
    setDataFound(false);
    setShowAlert(true); // Menampilkan alert
    // Redirect to /notfound page if data is not found
    navigate('/notfound');
  };
  


  return (
    <div className="filter">
      <label htmlFor="filter">Filter By:</label>
      <label>
        <input className='boxcek' type="checkbox" onChange={handleOpenNowChange} />
        Open Now
      </label>
      <label className="harga" htmlFor="price">Price:
        <select id="price" value={priceFilter} onChange={handlePriceChange}>
          <option value="">All</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </label>
      <label className='kateg' htmlFor="category">Categories:
        <select id="category" value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Italia">Italia</option>
          <option value="Modern">Modern</option>
          <option value="Sop">Sop</option>
          <option value="Jawa">Jawa</option>
          <option value="Bali">Bali</option>
          <option value="Spanyol">Spanyol</option>
          <option value="Sunda">Sunda</option>
        </select>
      </label>
      <button className='clear' onClick={() => { handleClearFilters(); handleFilterClick(); }}>CLEAR ALL</button>
  
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          No restaurants found with selected filters!
        </Alert>
      )}
    </div>
  );
};

export default Filter;
