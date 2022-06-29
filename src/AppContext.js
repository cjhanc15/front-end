import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [movies, setMovies] = useState( {
    title: '',
    release_year: 0,
    genre: '',
    cover: ''
  });

  const values = {
    movies
  }

  const setters = {
    setMovies
  }

  return (
    <AppContext.Provider value={{values, setters}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };