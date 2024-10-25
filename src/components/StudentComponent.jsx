import React from 'react'
import styles from '../style'

const StudentComponent = () => {
  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
      <div className='flex items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
          Good Day Sunshine, ___________!
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center p-4 text-white dark:text-white'>
      <div className='flex flex-col w-full'> 
          <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
              Here's your essay Tasks! 
          </div>
      </div>
      </div>

      <div className='flex flex-col items-center'>
        {/* Large Gray Div */}
        
        {/* Small Gray Divs */}
        <div className='flex flex-row items-center justify-center text-center'>
          <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-14 w-full text-primary'>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 1</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 2</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 3</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 4</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 5</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 6</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StudentComponent