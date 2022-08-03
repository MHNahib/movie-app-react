import "./App.css";
import SearchIcon from "./search.svg";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API}`;

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  // const movie = {
  //   "Title": "Test Movie",
  //   "Year": "2022",
  //   "imdbID": "1234",
  //   "Type": "movie",
  //   "Poster": "N/A"
  // }

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie DB</h1>

      <div className="search">
        <input type="text" value={searchTerm} placeholder="Search your favourite movies" onChange={(e) => { setSearchTerm(e.target.value) }} />
        <img src={SearchIcon} alt="search icon" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}


    </div>
  );
};

export default App;
