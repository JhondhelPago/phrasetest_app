import React from 'react'
import styles from '../style';
import {logo, close, menu, } from '../assets';
import { CreateTask, Button, } from '../components';


const TeacherEssayTask = ({isDark, changeColorTheme}) => {
  

  return (
    <div className={!isDark && 'dark'}>
    <nav className='bg-white dark:bg-primary w-full justify-center min-h-screen overflow-x-hidden'>
              <div className={`${styles.paddingX}`}>
                <div className='bg-white dark:bg-primary w-full items-center py-4'>
                <div className=" flex flex-row w-full items-center justify-around">
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px]" />
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px]" />
                </div>
                </div>
              </div>
              
                  <div className='bg-white dark:bg-primary'>
                  
                  <CreateTask />
                  <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                  </div>
                  
    </nav>
    </div>
  )
}

export default TeacherEssayTask