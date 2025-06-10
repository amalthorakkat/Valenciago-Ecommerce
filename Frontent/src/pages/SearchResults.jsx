import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const { search } = useLocation();
//   const query = new URLSearchParams(search).get("query");

//   useEffect(() => {
//     if (query) {
//       fetch(`/api/products/search?query=${encodeURIComponent(query)}`)
//         .then((res) => res.json())
//         .then((data) => setResults(data))
//         .catch(() => setResults([]));
//     }
//   }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
