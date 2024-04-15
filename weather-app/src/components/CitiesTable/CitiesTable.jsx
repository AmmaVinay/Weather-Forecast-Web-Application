// CitiesTable.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name');
        setCities(response.data.records);
        setFilteredCities(response.data.records);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching city data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = cities.filter(city => city.fields.name.toLowerCase().includes(searchTerm));
    setFilteredCities(filtered);
  };

  const handleSort = (key) => {
    let order = 'asc';
    if (sortBy === key && sortOrder === 'asc') {
      order = 'desc';
    }
    setSortBy(key);
    setSortOrder(order);
    const sortedCities = [...filteredCities].sort((a, b) => {
      const x = a.fields[key].toLowerCase();
      const y = b.fields[key].toLowerCase();
      return order === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
    });
    setFilteredCities(sortedCities);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <table ref={tableRef}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('country')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.recordid}>
              <td>
                <Link to={`/weather/${city.fields.name}`} target="_blank">{city.fields.name}</Link>
              </td>
              <td>{city.fields.country}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
