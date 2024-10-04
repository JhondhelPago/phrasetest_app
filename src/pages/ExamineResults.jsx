import React from 'react';
import styles from '../style';

import { Navbar, Footer, Button, Comparison, } from '../components';

const ExamineResults = ({isDark, changeColorTheme}) => {
  return (
    <>
    <div className={!isDark && 'dark'}>
        <div className=' bg-white  dark:bg-primary w-full overflow-hidden'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Comparison />
                </div>
            </div>

            <div className={`bg-white  dark:bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Button isDark={isDark} changeColorTheme={changeColorTheme}></Button>
                    <Footer />
                    
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

//Comparison

export default ExamineResults