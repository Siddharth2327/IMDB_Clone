import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import genrearr from '../utilities/genre.js'
import { MovieContext } from './MovieContext.jsx'
// we are only using the genreids object from the genre.js file 

function Watchlist() {

  // importing movie Context data
  const {watchlist, setWatchlist} = useContext(MovieContext);


  const [search, setSearch] = useState('')
  const [genreList, setGenreList] = useState([])
  const [currgenre, setCurrGenre] = useState('All Genre')
  
  
  // function for searching
  function searchMovie(e){
    setSearch(e.target.value)
    console.log(search)
  }

  
  // function to get genres and create filters
  useEffect(()=>{
    let temp = watchlist.map((movie)=>{
      return genrearr[movie.genre_ids[0]]
    })
    // to remove the repetitve genres in the temp array we use hash set method
   // in js we have inbuilt method for set
    temp = new Set(temp);
  // console.log(temp)
    setGenreList(["All Genre",...temp]) // make the temp set as array and spread out all the values
  },[watchlist])


  
// NOTE: in map function when we use {} we need to use return keyword to return the value
// if we use () we dont need to use return keyword so that there should be the exact thing that should we return there should not be any logic 
// for eg: see map function usage in use Effect and genre filters



// SORTING THE ARRAY BASED ON RATINGS
  const sortAsc = () =>{
    const sortedWatchList = [...watchlist].sort((a, b) => b.vote_average - a.vote_average) 
    // here spread operator ismused to make a shallow copy of the watchlist such that original watchlist is not disturbed
    //If the result is negative (a < b), a comes before b.
    // If positive (a > b), b comes before a.
    // If zero, the order remains unchanged.
    setWatchlist(sortedWatchList)
    localStorage.setItem('movies', JSON.stringify(sortedWatchList))
  }

  const sortDesc = () =>{
    const sortedWatchList = [...watchlist].sort((a,b)=> a.vote_average - b.vote_average)
    setWatchlist(sortedWatchList)
    localStorage.setItem('movies', JSON.stringify(sortedWatchList))
  }









  // function referal for removing the movies from the watchlist
  const handleRemove = (movieId)=>{
    // console.log("Remove button clicked")
    const updatedWatchList = watchlist.filter((movies) => movies.id !== movieId )
    setWatchlist(updatedWatchList)
    localStorage.setItem('movies', JSON.stringify(updatedWatchList))
  }
//   onClick={handleRemove(movieobj.id)} → Executes immediately during render.
// onClick={() => handleRemove(movieobj.id)} → Passes a function reference, executing only on click.
// so we use the second method to pass the function reference to the onClick event



  return (
    <>
    
      <div className='container mx-auto p-6'>
        {/*GENRE FILTERS*/}
         {/* This genre shows only the genre of the movies added to the watchlist */}
        <div className="flex flex-wrap justify-center gap-7 my-4">
          {genreList.map((genre)=>(
          <button
           key={genre}
            onClick={()=> setCurrGenre(genre)}
            className={`px-4 py-2 text-sm    rounded-md transition-all duration-300 ${
              currgenre === genre ? "bg-red-400    text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
            > 
            {genre}
            </button>
          ))}
        </div>
        


        {/*SEARCH BAR*/}
        <div className='flex justify-center my-6' >
          
          <input
           type="text" 
           placeholder='Search Movies'
            onChange={searchMovie} 
            value={search} 
            className='h-[3rem] w-[25rem] p-2 bg-gray-200 outline-none border border-gray-300 text-size-2 text-[1.2rem]'/>
        </div>

      </div>

      

      {/*MOVIE TABLE*/}
      <div className="w-full m-8 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">

          <thead className='bg-gray-200 border border-gray-200 text-[1.4rem] font-serif'>
            <tr>
              <th className="text-red-800 px-6 py-4 text-center ">Name</th>
              <th className="text-red-800 px-6 py-4 text-center">
                <span onClick={()=> sortAsc()} className='hover: cursor-pointer'>&#x2191;</span>
                Ratings
                <span onClick={()=> sortDesc()} className='hover: cursor-pointer'>&#x2193;</span>
                </th>
              <th className="text-red-800 px-6 py-4 text-center">Popularity</th>
              <th className="text-red-800 px-6 py-4 text-center">Genere</th>
              <th className="text-red-800 px-6 py-4 text-center"></th>
            </tr>
          </thead>

          <tbody className='text-[1.2rem]'>

            
               {/* Each time currgenre (state) or search(state) changes, the component re-renders, and the filtering logic is applied again.
This results in the displayed movies being updated according to the current filters. */}

            {watchlist.filter((movieobj)=>{
              if(currgenre==="All Genre" || currgenre===genrearr[movieobj.genre_ids[0]]) return movieobj
            }) // for genre based filtering
            .filter((movieobj)=>{
              return movieobj.title.toLowerCase().includes(search.toLowerCase())
            }) // for search based filtering
            .map((movieobj) => ( 
             <tr className='border-b-2'>
              
              <td className="px-6 py-4 flex items-center space-x-4">
                <img className='h-[7rem] w[11rem]' src={`https://image.tmdb.org/t/p/original${movieobj.poster_path}`} alt="Movie" />
                <div>{movieobj.title}</div>
              </td>
              
              <td className="px-6 py-4 text-center">{movieobj.vote_average}</td>
              <td className="px-6 py-4 text-center">{movieobj.popularity}</td>
              <td className="px-6 py-4 text-center">{genrearr[movieobj.genre_ids[0]]}</td>
              {/* mostly 1st genre in the genre array is preffered */}
              <td className="px-6 py-4 text-center text-red-500  ">
                <span onClick={()=>handleRemove(movieobj.id)} className='cursor-pointer hover:text-red-900'>Remove</span>
              </td>
             </tr>
            ))}
            
            
          </tbody>

        </table>
      </div>

    </>
  )
}

export default Watchlist
