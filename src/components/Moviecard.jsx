import React from 'react'
function Moviecard({movieObject}) {
    return (
        <>
        <div className='space-x-8 space-y-8 m-4 hover:scale-110 transition duration-300 ease-in-out transform '>
            <div className='w-[200px] h-[40vh] bg-cover ml-8 rounded-lg' 
            style={{ backgroundImage:`url(https://image.tmdb.org/t/p/original${movieObject.poster_path})` }}>
                <h5 className='text-white text-center text-2xl rounded-lg p-2 bg-gray-900/25'>{movieObject.title}</h5>
            </div>
        </div>
        </>  
    )
}
export default Moviecard

// we use props title and posterUrl to update the movie cards,
// instead of these getting props seperately we are passing the moviesObj as a prop directly
// we cant use the url we get from  the api directly so we add an absolute path to get the image 
// aboslute path we needed => https://image.tmdb.org/t/p/original/

