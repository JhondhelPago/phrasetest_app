import React, { useState } from 'react'
import {close, menu} from '../assets';


const StudentSidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
    setIsOpen(!isOpen);
    };


  return (
    <div>
    <div className='cursor-pointer' onClick={toggleSidebar}>
        <img src={isOpen ? close : menu} className="w-[28px] h-[28px] object-contain"/>
    </div>
    {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-end">
          <div className="w-full sm:w-full md:w-1/4 lg:w-1/4 h-full bg-white dark:bg-primary p-4 shadow-lg">
          <button 
              onClick={toggleSidebar} 
              className="absolute top-4 mt-4 text-gray-600 dark:text-gray-300"
            >
              <img src={close} className="w-[28px] h-[28px] object-contain" />
            </button>
            {/* Sidebar content */}
            <div className='mt-32'>
                
            <div className='w-full text-primary dark:text-white text-3xl sm:text-3xl md:text-3xl lg:text-4xl text-center font-semibold cursor-pointer'>
                    <div className='relative mb-6 group'>
                        <p>ASSIGNED TASK</p>
                        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 mt-1 bg-primary dark:bg-white  w-0 transition-all duration-300 group-hover:w-full"></span>
                    </div>
                    
                    <div className="relative mb-4 group">
                        <p> FINISHED TASK</p>
                        <span className="absolute left-1/2 transform -translate-x-1/2 h-1 mt-1 bg-primary dark:bg-white  w-0 transition-all duration-300 group-hover:w-full"></span>
                    </div>

                    
                    
                </div>
            </div>
            
          </div>
        </div>
    )}
    </div>

  );
};

export default StudentSidebar