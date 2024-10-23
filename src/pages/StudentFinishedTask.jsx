import React from 'react'
import styles from '../style';
import {logo, close, menu, } from '../assets';
import {  Button, FinishedTask, } from '../components';


const StudentFinishedTask = () => {
  

  return (
    <>
    <nav className='bg-white dark:bg-primary w-full justify-center min-h-screen overflow-x-hidden'>
              <div className={`${styles.paddingX}`}>
                <div className='bg-white dark:bg-primary w-full items-center py-4'>
                <div className=" flex flex-row w-full items-center justify-around">
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                </div>
                </div>
              </div>
              
                  <div className='bg-white dark:bg-primary'>
                  
                  <FinishedTask />
                  <Button/>
                  </div>
                  
    </nav>
    </>
  )
}

export default StudentFinishedTask