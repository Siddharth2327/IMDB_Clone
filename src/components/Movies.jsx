import React, { useContext, useEffect } from 'react'
import Moviecard from './Moviecard'
import Pagination from './Pagination'
import axios from 'axios'
import { useState } from 'react'
import { MovieContext } from './MovieContext'

function Movies() {
  // importing Moviecontext
  // const {handleAddToWatchlist, watchlist, setWatchlist} = useContext(MovieContext)




  // creating state for movie data using 
  
  
  const [movies, setMovies] = useState([])
  // console.log(movies) // for refernce purpose 
  // always keep the consolelog out of the useEffect

  const[page,setPage] = useState(1)
  function handlePrev(){
    if(page>1){
      setPage(page-1)
    }
  }
  function handleNext(){
    setPage(page+1)
  }


  useEffect(()=>{
    
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=54214450cfd78a5c89247ee674fb2b22&language=en-US&page=${page}`)
    .then((response)=>{
      setMovies(response.data.results)
      
    })
    .catch((err)=>{
      console.error("Cannot fetch API data => "+ err)
    })
  },[page])
// an empty dependency array makes the useeffect run only on the mounting

  return (
    <div>
      
        <>
          <div className='flex flex-wrap justify-evenly'>
            {movies.map((moviesObj) => (
              <Moviecard key={moviesObj.id} movieObject={moviesObj} />
            ))}
          </div>

          <div>
            <Pagination handleNext={handleNext} handlePrevious={handlePrev} page={page} />
          </div>
        </>
      
    </div>
  );
}

export default Movies