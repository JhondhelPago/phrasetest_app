import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../module/axiosInstances';
import axios from 'axios';
import styles from '../style';
import {logo} from '../assets';
import {  Button, StudentComponent, StudentSidebar } from '../components';
import { ReqAccessTokenSuperScope, StudentAPICalls } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';


const StudentPage = ({isDark, changeColorTheme}) => {


  return (
    <div className={!isDark && 'dark'}>
    <nav className='bg-white dark:bg-primary w-full justify-center min-h-screen overflow-x-hidden z-10'>
              <div className={`${styles.paddingX}`}>
                <div className='bg-white dark:bg-primary w-full items-center py-4'>
                <div className=" flex flex-row w-full items-center justify-around">
                    <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] " />
                    <StudentSidebar/>
                </div>
                </div>
              </div>
              
                  <div className='bg-white dark:bg-primary'>
                  <StudentComponent />
                  <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                  </div>
                  
    </nav>
    </div>
  )
}

export default StudentPage