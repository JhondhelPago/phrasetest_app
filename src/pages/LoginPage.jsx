import React from 'react';
import styles from '../style';
import {logo, GirlBook, } from '../assets';

import { Login, Button, } from "../components";

const LoginPage = ({isDark, changeColorTheme}) => {
  return (
    <>
        <div className={!isDark && 'dark'}>
            <section className='bg-primary dark:bg-white w-full min-h-screen flex justify-center'>
                <div className='relative w-1/2 h-full  flex-col hidden lg:block'>
                <div className={`${styles.paddingX} ${styles.flexCenter} `}>
                    <div className={`h-screen flex items-center justify-center`}>
                        <img src={GirlBook} alt="phrasetest" className="w-full h-1/2"/>
                    </div>
                </div>
                </div>
                <div className=' bg-white dark:bg-primary w-full lg:w-1/2  h-full flex flex-col'>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} text-white`}> 
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] mt-4"/>
                    <Login isDark={isDark} changeColorTheme={changeColorTheme}/>
                    <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                    </div>
                </div>
                </div>
                

            </section>
        </div>

    </>
  )
}

export default LoginPage