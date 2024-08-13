import { useState } from 'react';
import './searchbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [query, setQuery] = useState({
    city: "",
    minPrice: 0, 
    maxPrice: 10000000
  })
  const handleChange = (event) => {
    setQuery((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <div className='search-bar'>
      <form>
        <input type="text" placeholder='Location' name='city' onChange={handleChange} />
        <input type="number" name='minPrice' placeholder='Min Price' min={0} max={1000000} onChange={handleChange}/>
        <input type="number" name='maxPrice' placeholder='Max Price' min={0} max={1000000} onChange={handleChange} />
        <Link to={`/list?city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`} className="search-icon">
          <SearchIcon></SearchIcon>
          <span>Search</span>
        </Link>
      </form>
    </div>
  )
};

export default Searchbar;
