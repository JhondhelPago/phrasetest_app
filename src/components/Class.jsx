import React from 'react';
import styles from '../style';

const Class = () => {
  return (
    
    <>
        <div className="flex flex-col items-center justify-center text-center mt-10 text-primary dark:text-white font-poppins">
        
        <h2 className="text-3xl font-semibold mb-6">Please Enter the Class Code</h2>

        </div>
        
        <div className='flex flex-col w-full font-poppins text-primary dark:text-white p-44'>

        <div className='flex flex-col sm:flex-row md:flex-row justify-center items-center text-center'>

          <div className='text-center justify-evenly'>
            <label htmlFor="text" className='text-3xl whitespace-nowrap'>Enter Class Code</label>
          </div>

          <div className='text-primary m-4'>
            <input type="text" className='py-4 rounded-md p-2 texl-2xl text-center border-2  border-gray-500 '/>
          </div>
          
          <div className='text-center'>
            <button className='bg-green-500 px-6 py-4 rounded-lg '>
              Submit
            </button>
          </div>

        </div>    

        </div>
      

    </>
    
  );
};

export default Class;
