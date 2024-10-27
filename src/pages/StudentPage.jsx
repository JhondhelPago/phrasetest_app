import React, { useEffect } from 'react';
import { axiosInstance } from '../module/axiosInstances';
import axios from 'axios';
import styles from '../style';
import {logo, close, menu, } from '../assets';
import {  Button, StudentComponent, } from '../components';


const StudentPage = ({isDark, changeColorTheme}) => {



  //function here to check the refresh and access token is validated, place the function inside the initial render useEffect()
  //if access is invalid get new access using the refresh
  //if refresh is invalid, route the user to the login

  const getUserStudentData = async() => {

    try{
        console.log(localStorage.getItem('email'));
        console.log(localStorage.getItem('access'));

        const response = await axiosInstance.get('user/student/info', {
          params: {
            email: encodeURIComponent(localStorage.getItem('email')),
            access: encodeURIComponent(localStorage.getItem('access'))
          }
        });

        console.log(response.data);

        // set the useState variable from this user information

      

    }catch(error){
      console.log(`Error in the StudentPage Component @ getUserStudentData() -> void`);
      throw error;
    }

    console.log(`getUserData block is running.`)

  }

  useEffect(() => {

    getUserStudentData();

  }, [])
  

  return (
    <div className={!isDark && 'dark'}>
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
                  
                  <StudentComponent />
                  <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                  </div>
                  
    </nav>
    </div>
  )
}

export default StudentPage