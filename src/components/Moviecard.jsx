import React from 'react'





function Moviecard({ movieObject, finalAddToWatchlist, Watchlist }) {

    function doesContains() {
        for (let i = 0; i < Watchlist.length; i++) {
            if (Watchlist[i].id === movieObject.id) {
                return true;
            }
        }
        return false;
    }


    return (
        <>

            <div className='space-x-8 space-y-8 m-4 hover:scale-110 transition duration-300 ease-in-out transform '>

                <div className='w-[200px] h-[40vh] bg-cover ml-8 rounded-lg relative'
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObject.poster_path})`
                    }}>

                    {/*{To add the movies to watchlist when clicked on the heart button and to remove when clicked on tick button we use a ternary operator }*/}

                    {doesContains(movieObject) ? 
                    <div  className='absolute top-2 right-2 flex justify-center items-center p-2 w-[2rem] hover:cursor-pointer'>&#10004;</div> 
                            :
                    <div onClick={()=>finalAddToWatchlist(movieObject)} className='absolute top-2 right-2 flex justify-center items-center p-2 w-[2rem] hover:cursor-pointer'>&#128525;</div> 
                    }



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

// we dont need to add the movie to watchlist when we click on tick button (doesContain function is true)