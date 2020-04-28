/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    // .then(response => {
    //   console.log(response.data);
    //   setResults(response.data.hits);
    // });
  }, []); // to search dynamically, just pass query as a second argument to useEffect inside the brackets

  const getResults = async () => {
    setLoading(true); // to be able to display a loading text or a spinner 
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
    
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">

      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <h1 className="text-gray-900" style={{fontSize: "200%", fontWeight: "500"}}>Hooks News</h1>

      <form onSubmit={handleSearch} className="mb-2">
        <input 
        type="text" 
        onChange={event => setQuery(event.target.value)} 
        value={query}
        ref={searchInputRef}
        className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange-300 rounded m-1 p-1">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal-400 text-white p-1 rounded">
          Clear
        </button> {/* type="button", instead of "submit", separate the button from the form it's in */}
      </form>

      {loading ? (
        <div className="font-bold text-orange-800">Loading results...</div>
      ) : <ul className="leading-normal">
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url} target='_blank' rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">{result.title}</a>
          </li>
        ))}
      </ul>}
      {error && <div className="text-red-500 font-bold">{error.message}</div>}

    </div>
  );
}
