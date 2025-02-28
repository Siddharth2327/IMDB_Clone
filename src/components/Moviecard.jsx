import React from 'react'





function Moviecard({ movieObject, finalAddToWatchlist, Watchlist, setWatchlist }) {
    

    // function to check the watchlist and update the tick or heart emojie
    function doesContains() {
        for (let i = 0; i < Watchlist.length; i++) {
            if (Watchlist[i].id === movieObject.id) {
                return true;
            }
        }
        return false;
    }

    // function to remove from the wawtchlist while clicking on the tick emojie
    const handleRemoveOnTick = (movieId)=>{
        let updatedWatchList = Watchlist.filter((movie)=> movie.id!== movieId)
        setWatchlist(updatedWatchList)
        localStorage.setItem('movies', JSON.stringify(updatedWatchList))
    }


    return (
        <>

            <div className='space-x-8 space-y-8 m-4 hover:scale-110 transition duration-300 ease-in-out transform '>

                <div className='w-[200px] h-[40vh] bg-cover ml-8 rounded-lg relative hover:border border-gray-400 shadow-lg'
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObject.poster_path})`
                    }}>

                    {/*{To add the movies to watchlist when clicked on the heart button and to remove when clicked on tick button we use a ternary operator }*/}

                    {doesContains(movieObject) ? 
                    <div onClick={()=>handleRemoveOnTick(movieObject.id)} title="Remove from WatchList" 
                        className='text-[1.3rem] absolute top-0.8 right-1 flex justify-center items-center p-2 w-[2rem] hover:cursor-pointer '>
                        <span className='absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'></span>
                        &#10004;
                    </div> 
                              :
                    <div onClick={()=>finalAddToWatchlist(movieObject)} title="Add to WatchList" 
                    className='text-[1.3rem] absolute top-0.8 right-1 flex justify-center items-center p-2 w-[2rem] hover:cursor-pointer'>
                        <span className='absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'></span>
                        &#x2665;&#xfe0f;
                    </div> 
                    }



                    <h5 className='text-white font-serif text-center text-xl rounded-lg p-2 bg-gray-900/25 absolute bottom-0 left-0 right-0'>{movieObject.title}</h5>
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

// we dont need to add the movie to watchlist when we click on tick button (doesContain function is true)