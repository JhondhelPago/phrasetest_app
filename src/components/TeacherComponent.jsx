import React, { useState } from 'react';
import styles from '../style'
import { useNavigate } from 'react-router-dom';

const TeacherComponent = () => {

  const navigate = useNavigate();
  const [showStudentList, setShowStudentList] = useState(false);
  

    const routeToTeacherEssayTask = () => {
        
        navigate('/teacheressaytask');

};

const toggleStudentList = () => {
  setShowStudentList(!showStudentList);
};


  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>

      <div className='flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
        <div className='w-full flex flex-col sm:flex-row  items-center justify-evenly text-xl pt-4 text-primary dark:text-white text-center'>
        <p>Good Morning Teacher, (name of the teacher) !</p>
          <button className='text-primary dark:text-white bg-white dark:bg-primary border mt-2 md:mt-0 lg:mt-0 border-violet-500 rounded-lg p-2 px-4 text-xs'>
                  Class Code : 123456 
                </button>
        </div>  
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center pt-4 text-white dark:text-white'>
        
        <div className='flex items-center mb-4 sm:mb-0'>  
          <div className='flex items-center space-x-2'>
          <label className='text-xl text-primary dark:text-white mr-2 hidden sm:block'>Filter:</label>
            <select className='w-auto text-primary dark:text-white bg-blue-500 border border-blue-500 rounded-lg p-2 px-4 text-xs'>
              <option>class 1</option>
              <option>class 2</option>
            </select>
            <div className='flex items-center ml-2'>
                <button className='text-primary dark:text-white bg-green-500 border border-green-500 rounded-lg p-2 px-4 text-xs'>
                  add new class +
                </button>
            </div>
          </div>
        </div>
          
          

          <div className='flex items-center text-xs'>
            <button className=' text-primary dark:text-white bg-green-500 border border-green-500 border-lg px-4 rounded-lg p-2' onClick={routeToTeacherEssayTask}>
              Create Essay Task 
            </button>
          </div>
      </div>

      <div className='flex flex-col items-center justify-center text-xl  text-primary dark:text-white text-center'>
        <div className='w-4/12 sm:w-6/12 md:w-3/12 lg:w-6/12 flex flex-col sm:flex-row  items-center justify-start text-xl pt-4 text-primary dark:text-white text-center'>
        <p>Recent Task</p>
        </div>  
      </div>

      {/* Recent Task Section */}
      <div className='px-4'>
      <div className='w-full max-w-prose bg-gray-300 rounded-xl p-4  mx-auto mt-2 mb-4'>
        <div className='flex flex-col xxs:flex-row xs:flex-row justify-around xs:justify-evenly items-center text-center  mb-2'>
          <span className='font-semibold '>Assignment: 1</span>
          <span className='m-1'>Date Created: 11/12/2024</span>
          <span className='m-1'>Due Date: 11/13/2024</span>
        </div>
        <div className='flex flex-col xxs:flex-row xs:flex-row justify-around xs:justify-evenly items-center text-center mb-2'>
          <span className='m-1'>Understanding The Self</span>
          <span className='m-1'>Submitted: 45/50</span>
          <button className='m-1 bg-blue-500 text-white rounded-lg px-4 py-2 text-sm' onClick={toggleStudentList}>View Students</button>
        </div>
        <div className='flex justify-end'>
          
        </div>
      </div>
      </div>
      
      {/* Student List Section - Conditionally Rendered */}
      {showStudentList && (
        <div className='px-4'>
          <div className='w-full max-w-prose bg-gray-200 rounded-xl p-4 mx-auto mb-4'>
              <div className='flex text-center text-primary'>
      
                {/* Column 1: Student Name */}
                <div className='flex-1 cursor-pointer'>
                  <div className='font-semibold'>Student Name</div>
                  <div>John Doe</div>
                  <div>Jane Smith</div>
                  <div>Mark Johnson</div>
                </div>

      {/* Vertical Line */}
      <div className='w-px bg-gray-400 mx-4'></div>

                {/* Column 2: Date Submitted */}
                <div className='flex-1 cursor-pointer'>
                  <div className='font-semibold'>Date Submitted</div>
                  <div>11/12/2024</div>
                  <div>11/12/2024</div>
                  <div>11/12/2024</div>
                </div>

      {/* Vertical Line */}
      <div className='w-px bg-gray-400 mx-4'></div>

                {/* Column 3: Evaluation */}
                <div className='flex-1 cursor-pointer'>
                  <div className='font-semibold'>Evaluation</div>
                  <div>Excellent</div>
                  <div>Good</div>
                  <div>Needs Improvement</div>
                </div>

              </div>
          </div>
        </div>
)}


      <div className='flex flex-col items-center mb-4'>
        {/* Small Gray Divs */}
        <div className='flex flex-row items-center justify-center'>
          <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-4 w-full text-primary'>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TeacherComponent