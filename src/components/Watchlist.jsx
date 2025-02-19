import React from 'react'

function Watchlist() {
  return (
    <>
      <div>
        {/*genere Filters*/}
        {/*Search bar*/}
      </div>

      {/*table*/}
      <div className="w-full m-8 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">

          <thead className='bg-gray-200 border border-gray-200'>
            <tr>
              <th className="text-red-800 px-6 py-4 text-center">Name</th>
              <th className="text-red-800 px-6 py-4 text-center">Ratings</th>
              <th className="text-red-800 px-6 py-4 text-center">Popularity</th>
              <th className="text-red-800 px-6 py-4 text-center">Genere</th>
              <th className="text-red-800 px-6 py-4 text-center">Remove Movies</th>
            </tr>
          </thead>

          <tbody>
            <tr className='border-b-2'>
              <td className="px-6 py-4 flex items-center space-x-4">Poster
                <div>vidamuyarchi</div>
              </td>
              
              <td className="px-6 py-4 text-center">8.2</td>
              <td className="px-6 py-4 text-center">2517.87</td>
              <td className="px-6 py-4 text-center">Action</td>
              <td className="px-6 py-4 text-center text-red-500 hover:text-red-900 cursor-pointer">Remove</td>
            </tr>
          </tbody>

        </table>
      </div>

    </>
  )
}

export default Watchlist
