import { useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import {Button} from '@mui/material'
import './MovieList.css'

const MovieList = () => {
  //Hooks
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  //Fetch
  useEffect(() => {
    fetch('https://epmovieapi.herokuapp.com/movies')
    .then(res => res.json())
    .then(data => setMovies(data))
  }, [])
  //Helper Functions
  const searchHandler = (e) => {
    setSearchInput(e.target.value)
  };

  let filteredResults = movies.filter(movie => {
    return movie.title.toUpperCase().includes(searchInput.toUpperCase())
  })

  const addMovie = (title, genre, release_year, cover) => {
    const newMovie = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
        release_year: parseFloat(release_year),
        cover: cover
      })
    }
    fetch('https://epmovieapi.herokuapp.com/movies', newMovie)
    .then(res => res.json())
    .then(data => {
    setMovies(data);
    })
  }

  const deleteMovie = (id) => {
    fetch(`https://epmovieapi.herokuapp.com/movies/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    setMovies((data) => data.filter(info => info.id !== id))
  }

  return (
    <>
    <div className="page">
      <div className="header-container">
        <div className="signature-container">
          <img className="signature" src="https://acimg.auctivacommerce.com/imgdata/0/2/0/4/2/7/webimg/3740000.jpg" alt="movie cover"/>
        </div>
        <div className="search">        
          <input className="search-input" type="text" placeholder="Search" onKeyUp={(e) => searchHandler(e)} />

        </div>
      </div>
        <div className="results">
        {filteredResults.map(movie => (
          <div>
            <FormDialog movie={movie.title} id={movie.id} list={{movies, setMovies}}/>
            <img className='cover' src={movie.cover} alt={movie.title}/>
            <div className="buttons">            
              <Button variant="outlined"className="delete" onClick={() => {
              deleteMovie(movie.id)
              }}>Delete</Button>
            </div>
          </div>
        ))}
        </div>
      <h3 className="header-3">Not finding a movie? Add it here!</h3>
      <div className="inputs">
        <input id='title' placeholder='Title'/>
        <input id='genre' placeholder='Genre'/>
        <input id='release_year' placeholder='Year Released'/>
        <input id='cover' placeholder='Cover'/>
        <button onClick={() => {
          addMovie(
            document.getElementById('title').value,
            document.getElementById('genre').value,
            document.getElementById('release_year').value,
            document.getElementById('cover').value,
          )
        }}>Add Movie</button>
      </div>          
    </div>
    </>
  )
}

export default MovieList