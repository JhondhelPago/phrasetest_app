//Home
//code refractor
import React from 'react';
import styles from '../style';

import {Navbar, Hero, Stats, Testimonials, Footer, Button, } from '../components';

const Home = ({isDark, changeColorTheme}) =>  {
    


    return (
      <div className={!isDark && 'dark'}>
        <div className=' bg-white  dark:bg-primary w-full overflow-hidden'>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>

        <div className={`bg-white  dark:bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-white  dark:bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
          <Button isDark={isDark} changeColorTheme={changeColorTheme}></Button>
            <Stats />
            <Testimonials />
            <Footer />
            
            
          </div>
        </div>
        
        </div>
      </div>
    )

}

export default Home