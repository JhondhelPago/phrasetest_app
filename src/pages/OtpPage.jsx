import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style';
import { logo,} from '../assets';

import { getCurrentTimestamp } from '../module/utils';

import { Button } from "../components";

const OtpPage = ({isDark, changeColorTheme}) => {

    const navigate = useNavigate();
    
    const [EmailStored, SetEmailStored] = useState(null);


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

        console.log(EmailStored);
        console.log(Opt_string);
        console.log(getCurrentTimestamp());



        try{

            const data = {
                "email": EmailStored,
                "otp_code" : `${Digit1}${Digit2}${Digit3}${Digit4}${Digit5}${Digit6}`,
                "time_created" : getCurrentTimestamp()
            }

            const response = await axios.post(`http://127.0.0.1:8000/user/auth/otp/verify`, data);

            console.log(response);

            if (response.status == 202){
                alert('signup successfully verified');

                navigate('/loginpage');

            } else if (response.status = 408) {

                alert('otp time out. resend new otp');

            } else if (response.status = 404) {

                alert('email is not registered.');

            }

        }catch(error){
            console.log(error)
            throw error;
        }

    }

    const handleResend = async(event) => {
        event.preventDefault();

        const data = {
            "email": EmailStored
        }

        const response = await axios.post(`http://127.0.0.1:8000/user/auth/otp/reverify`, data);

        if (response.status = 403){
            alert('email is already verified');

        } else if (response.status == 200){
            alert('email has been sent. check your mail');
        }


        
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
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit1} onChange={UpdateDigit1} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit2} onChange={UpdateDigit2} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit3} onChange={UpdateDigit3} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit4} onChange={UpdateDigit4} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit5} onChange={UpdateDigit5} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        <input type="text"  className='w-24 text-primary  mt-2 py-2 text-center border rounded-lg border-gray-500 outline-none focus:outline-none mr-4' value={Digit6} onChange={UpdateDigit6} maxLength="1" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}/>
                        </div>

                        <div className='w-auto h-auto flex flex-row items-center  justify-center'>
                        <button className='font-semibold w-11/12 text-white dark:text-primary bg-blue-500 dark:bg-blue-500 rounded-lg border-lg border-white dark:border-primary border mr-4 p-4 px-16 text-center mt-4 mb-20' onClick={handleSubmit}>
                            Submit
                            
                        </button>
                        <button className='font-semibold  text-white dark:text-primary bg-green-600 dark:bg-green-600 rounded-lg border-lg border-white dark:border-primary border p-4 px-7 text-center mt-4 mb-20'>
                            Resend
                            
                        </button>
                        </div>
                        

                        <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OtpPage
