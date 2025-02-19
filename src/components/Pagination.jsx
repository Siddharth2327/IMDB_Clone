import React from 'react'

function Pagination({handlePrevious, handleNext, page}) {

  return (
    <div className='bg-gray-400 h-[40px] w-full mt-8 flex justify-center gap-2'>
        <div className='p-2.5 hover:text-white cursor-pointer'><i onClick={handlePrevious} class="fa-solid fa-arrow-left"></i></div>
        <div className='p-2.5 '>{page}</div>
        <div className='p-2.5 hover:text-white cursor-pointer'><i onClick={handleNext} class="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Pagination
