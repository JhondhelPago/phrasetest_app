import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style';
import { logo,} from '../assets';

import { Button } from "../components";

const OtpPage = ({isDark, changeColorTheme}) => {

    
    const [EmailStored, SetEmailStored] = useState(null);


    //get the email value in the localstorage
    const getEmail = () => {
        const storedEmail = localStorage.getItem('email');

        SetEmailStored(storedEmail);
        
    }

    //submit handlers
    // const handleSubmit = (event) => {

    //     event.preventDefault();

    //     try{

    //         const response = await axios.post()

    //     }catch{

    //     }

    // }


    useEffect(() => {
        getEmail();
        
    }, [])

    return (
        <div className={!isDark && 'dark'}>
            <section className='bg-white dark:bg-primary w-full min-h-screen flex flex-col justify-start md:flex-row items-start font-poppins'>
                
                <div className='bg-white dark:bg-primary relative w-full  min-h-screen flex flex-col'>
                    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                        <div className={`${styles.boxWidth}`}>
                            <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] mt-4" />
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col items-center justify-center mt-4'>
                        <div className='flex justify-center items-center font-bold'>
                            <label className='text-3xl text-primary text-center dark:text-white justify-center'>We’ve Sent you the OTP please check youre email! </label>
                        </div>
                        <div className='flex flex-row md:flex-row flex-wrap items-center justify-center text-center mt-4 mb-4 font-bold'>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4'/>
                        </div>
                        <button className='font-semibold w-auto text-white dark:text-primary bg-primary dark:bg-white rounded-lg border-lg border-white dark:border-primary border p-4 text-center mt-4 mb-20' >
                            Submit
                            <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OtpPage
