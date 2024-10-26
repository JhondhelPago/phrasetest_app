import React from 'react'
import styles from '../style'

const OngoingTask = () => {
  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
        
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        <div className='flex flex-col w-full'> 
            <div className='flex justify-center text-center align-center text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12  font-semibold p-7'>
            Context 1 :  What is your biggest fear?
            </div>
        
            <div>
                <textarea placeholder="Question 1" className="w-10/12 h-full sm:w-9/12 md:w-10/12 lg:w-8/12 pl-2 pt-2 pb-96 sm:pb-80 md:pb-72 lg:pb-60 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text"></textarea>
            </div>
        </div>

      </div>

        

        <div className='flex flex-row items-center  justify-center mt-6'>
        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white mb-4'>

        <div className='flex flex-col items-center justify-evenly text-center text-white dark:text-white'>
            <button className='flex font-semibold text-white dark:text-primary bg-green-600 dark:bg-green-600 rounded-lg border-lg border-white dark:border-primary border p-4 px-16 text-center'>
                Submit        
            </button>
        </div>
        </div>
        </div>
        

    </div>
    </>
  )
}

export default OngoingTask