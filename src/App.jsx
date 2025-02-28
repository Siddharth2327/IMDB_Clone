
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Moviecard from './components/Moviecard'
import Watchlist from './components/Watchlist'
import Movies from './components/Movies'
import MovieRecommendation from './components/MovieRecommendation'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import { useState, useEffect } from 'react'
function App() {
   const [watchlist, setWatchlist] = useState([])

   const handleAddToWatchlist = (movieobj)=>{
    let updatedWatchlist = [...watchlist, movieobj] // we use SPREAD OPERATOR(...) to update the watchlist without changing the original state
    setWatchlist(updatedWatchlist) 
    console.log(updatedWatchlist)

    localStorage.setItem('movies', JSON.stringify(updatedWatchlist))
   }

//   onClick={handleAddToWatchlist(movieobj.id)} → Executes immediately during render.
// onClick={() => handleRemove(movieobj.id)} → Passes a function reference, executing only on click.
// so we use the second method to pass the function reference to the onClick event


useEffect(()=>{
  let moviesFromLS = localStorage.getItem('movies')
  if(moviesFromLS) setWatchlist(JSON.parse(moviesFromLS))
},[])  



  return (
    <>
      <BrowserRouter>
      <Navbar/>
      
      <div className='space-y-10  flex flex-wrap justify-space-around'>
      <Routes>
          <Route
            path='/' 
            element={
              <>
                <Banner/>
                <Movies addToWatchlist={handleAddToWatchlist} Watchlist={watchlist} setWatchlist={setWatchlist} />
              </>
            }
          />
          <Route path='/watchlist' element={<Watchlist watchlist = {watchlist} setWatchlist={setWatchlist} />}/> 
          
          <Route path='/recommend' element={<MovieRecommendation/>}/>
      </Routes>
      </div> 
      
      </BrowserRouter>
    </>
  )
}

export default App

