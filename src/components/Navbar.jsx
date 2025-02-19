import React from 'react'
import { Link } from 'react-router-dom'

//impoprting the image to this file
// we can give any name to the file while rendering to this file
import Logo from '../movieLogo.png'
function Navbar() {
  return (
    <div className='flex space-x-8 pl-3 py-4 items-center bg-gray-200 '>
      <img className="w-[70px]"src={Logo} alt='Logo'/>
      <Link to="/" className="text-3xl font-bold text-red-800 hover:text-red-400">Movies</Link> 
      <Link to="/watchlist" className="text-3xl font-bold text-red-800 hover:text-red-400">Watchlist</Link>
      <Link to="/recommend" className="text-3xl font-bold text-red-800 hover:text-red-400">Movie Recommendations</Link>
    </div>
  )
}

export default Navbar




// "/" we give it to make the link to the home page
// change anchor tag to link tag such that we can avoid the page refresh
