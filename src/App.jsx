
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Moviecard from './components/Moviecard'
import Watchlist from './components/Watchlist'
import Movies from './components/Movies'
import MovieRecommendation from './components/MovieRecommendation'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
function App() {
  

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
                <Movies/>
              </>
            }
          />
          <Route path='/watchlist' element={<Watchlist/>}/>
          <Route path='/recommend' element={<MovieRecommendation/>}/>
      </Routes>
      </div> 
      
      </BrowserRouter>
    </>
  )
}

export default App

