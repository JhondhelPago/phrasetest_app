import React from 'react';
import styles from '../style';

const Class = () => {
  return (
    
    <>
        <div className="flex flex-col items-center justify-center text-center mt-10 text-primary dark:text-white font-poppins">
        
        <h2 className="text-3xl font-semibold mb-6">Please Enter the Class Code</h2>

        </div>
        
        <div className='w-full flex items-center justify-evenly'>
        <div className="w-full flex flex-row sm:flex-col justify-evenly items-center text-center">
          
          <div className='w-full flex flex-col sm:flex-row items-center justify-evenly p-4'>
            
            <div className="w-full sm:w-3/12">
            <label htmlFor="classCode" className="text-gray-300">Enter class code</label>
            </div>
            
            
            <div className='w-full'>
            <input
              id="classCode"
              type="text"
              placeholder="Enter class code"
              className="p-2 w-1/3 text-center border border-gray-300 rounded mr-4 text-primary bg-white placeholder-gray-500"
            />
            </div>
            
            <div>
            <button
              className="px-12 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
            >
              Enter
            </button>
            </div>
            
          </div>
        </div>

        </div>
        
        
      

    </>
    
  );
};

export default Class;
