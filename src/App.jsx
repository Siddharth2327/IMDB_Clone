
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import {lazy, useState, useEffect } from 'react'
import { MovieContext } from './components/MovieContext'

const WatchListPage = lazy(() => import('./components/Watchlist'));
const MovieRecommendationPage = lazy(() => import('./components/MovieRecommendation')); 




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
    <MovieContext.Provider value={{handleAddToWatchlist, watchlist, setWatchlist}}>
      <BrowserRouter>
        <Navbar/>
      
       <div className='space-y-10  flex flex-wrap justify-space-around'>
        <Routes>
          <Route
            path='/' 
            element={
              <>
                <Banner/>
                <Movies  />
              </>
            }
          />
          <Route path='/watchlist' element={<WatchListPage/>}/> 
          
          <Route path='/recommend' element={<MovieRecommendationPage/>}/>
        </Routes>
        </div> 
      
      </BrowserRouter>
    </MovieContext.Provider>
      
    </>
  )
}

export default App




