import { useSearchParams } from 'react-router-dom';
import './filter.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Filter = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 10000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const handleChange = (event) => {
    setQuery({...query, [event.target.name]: event.target.value})
  }

  const handleFilter = () => {
    setSearchParams(query);
  }
  return (
    <div className='filter'>
      <p>Search result for: {searchParams.get("city")}</p>
      <form action="">
        <div className="location">
          <label htmlFor="city">City</label>
          <input type="text" name="city" placeholder='City' onChange={handleChange} defaultValue={query.city} />
        </div>
        <div className="other-filters">
          <div className="minPrice">
            <label htmlFor="minPrice">Min. Price</label>
            <input type="number" name="minPrice" placeholder='any' onChange={handleChange} defaultValue={query.minPrice}/>
          </div>
          <div className="maxPrice">
            <label htmlFor="maxPrice">Max. Price</label>
            <input type="number" name="maxPrice" placeholder='any'  onChange={handleChange} defaultValue={query.maxPrice}/>
          </div>
          <div className="beedroom">
            <label htmlFor="bedroom">Bedroom</label>
            <input type="number" name="bedroom" placeholder='any' onChange={handleChange} defaultValue={query.bedroom}/>
          </div>
          <button className="search-icon" onClick={handleFilter}>
            <SearchIcon></SearchIcon>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
};

export default Filter;
