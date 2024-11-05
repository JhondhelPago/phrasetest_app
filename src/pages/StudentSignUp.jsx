import React from 'react';
import styles from '../style';
import {logo, KidJoyful, } from '../assets';

import { Student, Button, } from "../components";

const StudentSignUp = ({isDark, changeColorTheme}) => {
  return (
    <>
        <div className={!isDark && 'dark'}>
            <section className='bg-primary dark:bg-white w-full items-center justify-center min-h-screen flex'>
                <div className="absolute top-4 left-4">
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                </div>
                <div className='relative w-1/2 h-full  flex-col hidden lg:block'>
                <div className={`${styles.paddingX} ${styles.flexCenter} `}>
                    <div className={`h-screen flex items-center justify-center`}>
                        <img src={KidJoyful} alt="phrasetest" className="w-full h-1/2"/>
                    </div>
                </div>
                </div>
                <div className=' bg-white dark:bg-primary w-full lg:w-1/2  h-full flex flex-col'>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} text-white`}> 
                    
                    <Student isDark={isDark} changeColorTheme={changeColorTheme}/>
                    <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                    </div>
                </div>
                </div>
                

            </section>
        </div>

    </>
  )
}

export default StudentSignUp