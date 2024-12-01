import React from 'react';
import styles from '../style';
import {logo} from '../assets';

import { Footer, Button, Comparison, TeacherSidebar} from '../components';


// import TeacherViewComparison from '../components/TeacherViewComparison';

import { StudentAPICalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import TeacherViewComparison from '../components/TeacherViewComparison';
import TeacherViewComparison2 from '../components/TeacherViewComparison2';

const TeacherExamineResults = ({isDark, changeColorTheme}) => {

    return (
        <>
        <div className={!isDark && 'dark'}>
            <div className=' bg-white  dark:bg-primary w-full min-h-screen overflow-x-hidden'>
            <div className={`${styles.paddingX}`}>
                    <div className='bg-white dark:bg-primary w-full items-center py-4'>
                    <div className=" flex flex-row w-full items-center justify-around">
                        <img src={logo} alt="phrasetest" className="w-[256px] h-[64px]"/>
                        <TeacherSidebar/>
                    </div>
                    </div>
                </div>

                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        {/* <TeacherViewComparison></TeacherViewComparison> */}
                        <TeacherViewComparison2></TeacherViewComparison2>
                    </div>
                </div>

                <div className={`bg-white  dark:bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Button isDark={isDark} changeColorTheme={changeColorTheme}></Button>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}

//Comparison

export default TeacherExamineResults;