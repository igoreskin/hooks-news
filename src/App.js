/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');

  useEffect(() => {
    getResults();
    // .then(response => {
    //   console.log(response.data);
    //   setResults(response.data.hits);
    // });
  }, []); // to search dynamically, just pass query as a second argument to useEffect inside the brackets

  const getResults = async () => {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
  }

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  return (
    <div>

      <form onSubmit={handleSearch}>
        <input type="text" onChange={event => setQuery(event.target.value)} value={query} />
        <button type="submit"/* onClick={getResults}*/>Search</button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url} target='_blank' rel="noopener noreferrer">{result.title}</a>
          </li>
        ))}
      </ul>

    </div>
  );
}
