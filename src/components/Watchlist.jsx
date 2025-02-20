import React from 'react'
import { useState } from 'react'



function Watchlist({watchlist}) {

  const [search, setSearch] = useState('')

  function searchMovie(e){
    setSearch(e.target.value)
    console.log(search)
  }



  return (
    <>
      <div className='w-full flex justify-center items-center my-8 '>
        {/*genere Filters*/}


        {/*Search bar*/}
        <div >
          <input type="text" placeholder='Search Movies' onChange={searchMovie} value={search} className='h-[3rem] w-[25rem] p-2 bg-gray-200 outline-none border border-gray-300 text-size-2 text-[1.2rem]'/>
        </div>


      </div>

      {/*table*/}
      <div className="w-full m-8 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">

          <thead className='bg-gray-200 border border-gray-200 text-[1.4rem]'>
            <tr>
              <th className="text-red-800 px-6 py-4 text-center">Name</th>
              <th className="text-red-800 px-6 py-4 text-center">Ratings</th>
              <th className="text-red-800 px-6 py-4 text-center">Popularity</th>
              <th className="text-red-800 px-6 py-4 text-center">Genere</th>
              <th className="text-red-800 px-6 py-4 text-center">Remove Movies</th>
            </tr>
          </thead>

          <tbody className='text-[1.2rem]'>
               {/* filtering the watchlist based on the search and then printing the data in the table */}
            {watchlist.filter((movieobj)=>{
              return movieobj.title.toLowerCase().includes(search.toLowerCase())
            }).map((movieobj) => (
              <tr className='border-b-2'>
              
              <td className="px-6 py-4 flex items-center space-x-4">
                <img className='h-[7rem] w[11rem]' src={`https://image.tmdb.org/t/p/original${movieobj.poster_path}`} alt="Movie" />
                <div>{movieobj.title}</div>
              </td>
              
              <td className="px-6 py-4 text-center">{movieobj.vote_average}</td>
              <td className="px-6 py-4 text-center">{movieobj.popularity}</td>
              <td className="px-6 py-4 text-center">Action</td>
              <td className="px-6 py-4 text-center text-red-500 hover:text-red-900 cursor-pointer">Remove</td>
            </tr>
            ))}
            
            
          </tbody>

        </table>
      </div>

    </>
  )
}

export default Watchlist
