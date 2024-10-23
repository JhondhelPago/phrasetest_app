import React from 'react'
import styles from '../style';
import {logo, close, menu, } from '../assets';
import {  Button, StudentComponent, } from '../components';


const StudentPage = () => {
  

  return (
    <>
    <nav className='bg-white dark:bg-primary w-full justify-center min-h-screen'>
              <div className={`${styles.paddingX}`}>
                <div className='bg-white dark:bg-primary w-full items-center py-4'>
                <div className=" flex flex-row w-full items-center justify-around">
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                </div>
                </div>
              </div>
              
                  <div className='bg-white dark:bg-primary'>
                  
                  <StudentComponent />
                  <Button/>
                  </div>
                  
    </nav>
    </>
  )
}

export default StudentPage