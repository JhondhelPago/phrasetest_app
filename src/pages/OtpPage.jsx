import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style';
import { logo,} from '../assets';

import { getCurrentTimestamp } from '../module/utils';

import { Button } from "../components";

const OtpPage = ({isDark, changeColorTheme}) => {

    
    const [EmailStored, SetEmailStored] = useState(null);
    const [Otp, SetOtp] = useState(null);

    const [Digit1, SetDigit1] = useState(null);
    const [Digit2, SetDigit2] = useState(null);
    const [Digit3, SetDigit3] = useState(null);
    const [Digit4, SetDigit4] = useState(null);
    const [Digit5, SetDigit5] = useState(null);
    const [Digit6, SetDigit6] = useState(null);

    const UpdateDigit1 = (event) => {
        SetDigit1(event.target.value);
    }

    const UpdateDigit2 = (event) => {
        SetDigit2(event.target.value);
    }

    const UpdateDigit3 = (event) => {
        SetDigit3(event.target.value);
    }

    const UpdateDigit4 = (event) => {
        SetDigit4(event.target.value);
    }

    const UpdateDigit5 = (event) => {
        SetDigit5(event.target.value);
    }

    const UpdateDigit6 = (event) => {
        SetDigit6(event.target.value);
    }


    //get the email value in the localstorage
    const getEmail = () => {
        const storedEmail = localStorage.getItem('email');

        SetEmailStored(storedEmail);
        
    }

    //submit handlers
    const handleSubmit = async(event) => {

        event.preventDefault();

        const Opt_string = Digit1+Digit2+Digit3+Digit4+Digit5+Digit6;


        console.log(Opt_string);
        console.log(getCurrentTimestamp());


        // try{

        //     data = {
        //         "email": EmailStored,
        //     }

        //     const response = await axios.post()

        // }catch{

        // }

    }


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
                            <label className='text-3xl text-primary text-center dark:text-white justify-center'>We’ve Sent you the OTP please check your email! </label>
                        </div>
                        <div className='flex flex-row md:flex-row flex-wrap items-center justify-center text-center mt-4 mb-4 font-bold'>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit1} onChange={UpdateDigit1}/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit2} onChange={UpdateDigit2}/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit3} onChange={UpdateDigit3}/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit4} onChange={UpdateDigit4}/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit5} onChange={UpdateDigit5}/>
                        <input type="number"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit6} onChange={UpdateDigit6}/>
                        </div>
                        <button className='font-semibold w-auto text-white dark:text-primary bg-primary dark:bg-white rounded-lg border-lg border-white dark:border-primary border p-4 text-center mt-4 mb-20' onClick={handleSubmit}>
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
