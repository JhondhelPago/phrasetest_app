import React from 'react'
import styles from '../style'

const CreateTask = () => {
  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
        
        <div className='flex flex-col items-center mb-4 sm:mb-0 justify-start mt-4'>
          <select className='flex w-6/12 sm:2/12 md:2/12 lg:w-2/12 text-white dark:text-primary text-center bg-blue-500 border border-blue-500 rounded-lg p-2 px-4 text-xl'>
          <option value={''} disabled selected>Select Section</option>
            <option>Section 1</option>
            <option>Section 2</option>
            <option>Section 3</option>
          </select>
        </div>
        
      
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        <div className='flex flex-col w-full'> 
            <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
                Create An Essay Question
            </div>
        
            <div>
                <textarea placeholder="Question 1" className="w-7/12 pl-2 pt-2 pb-52 sm:pb-40 md:pb-30 lg:pb-20 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text"></textarea>
            </div>
        </div>

      </div>

        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

            <div className='flex flex-col w-full'> 
                <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
                Create An Essay Question
                </div>

                <div>
                <textarea placeholder="Question 2" className="w-7/12 pl-2 pt-2 pb-52 sm:pb-40 md:pb-30 lg:pb-20 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text"></textarea>
                </div>
            </div>

        </div>

        <div className='flex flex-row items-center  justify-center mt-6'>
        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white mb-4'>

            <button className='flex font-semibold text-white dark:text-primary bg-blue-500 dark:bg-blue-500 rounded-lg border-lg border-white dark:border-primary border mr-4 p-4 px-16 text-center'>
                Add New Question   
            </button>
        <div className='flex flex-col items-center justify-evenly text-center text-white dark:text-white mb-4 mt-4'>
            <button className='flex font-semibold text-white dark:text-primary bg-green-600 dark:bg-green-600 rounded-lg border-lg border-white dark:border-primary border p-4 px-16 text-center'>
                Post        
            </button>
        </div>
        </div>
        </div>
        

    </div>
    </>
  )
}

export default CreateTask