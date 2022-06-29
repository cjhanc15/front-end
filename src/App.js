import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieList from "./MovieList";
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<MovieList/>}/>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
