import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();

    // setup useState variable here to contain the login credentials

    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');

    // setup a function here handle the login button, a function to submit the required informatin to the axios with post method

    const handleLoginButton = async() => {

        console.log(`Email: ${Email}`);
        console.log(`Password : ${Password}`)

    

        const response =  await axios.post(`http://127.0.0.1:8000/user/auth/login`, {
            'email' : Email,
            'password' : Password
        });

        const refresh_access = response.data;

        console.log(refresh_access);
        console.log(refresh_access.refresh);
        console.log(refresh_access.access);

        if ((refresh_access.refresh !== '') && (refresh_access.access !== '')){


            console.log(`save the refresh and acess token to localStrorage`);
            
            console.log('route to the homepage');


            routeToHome();

        }else{
            
            console.log(`clear the useState variable`);

            SetEmail('');
            SetPassword('');

            alert('in valid login credentials');

            
        }

    }

    const EmailFieldUpdateChange = (event) => {
        SetEmail(event.target.value);
    }

    const PasswordFieldUpdateChange = (event) => {
        SetPassword(event.target.value);
    }

    const routeToHome = () => {
        navigate('/');
    }


  return (

    <>
       
        <div className={`${styles.paddingX} ${styles.paddingY}  w-full items-center justify- xs:w-full font-poppins`}>

            <h1 className='text-2xl font-bold mt-14  text-primary dark:text-white mb-10'>
            Welcome! Please Enter Your Details.
            </h1>

            <div className="flex flex-col justify-items-start w-full h-full">
                <div className='text-xl font-thin  text-primary dark:text-white'>
                    Email<span className='text-red-500'>*</span>
                </div>
                <div className='w-full flex flex-col'>
                    <input type="email" placeholder=" Email" className='w-full text-primary  mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={EmailFieldUpdateChange} value={Email}/>
                </div>

                <div className='text-xl font-thin  text-primary dark:text-white'>
                    Password<span className='text-red-500'>*</span>
                </div>
                <div className='w-full flex flex-col'>
                    <input type="password" placeholder=" Password" className='w-full text-primary  mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none' onChange={PasswordFieldUpdateChange} value={Password}/>
                </div>
                
                <div className='w-full flex items-center justify-between text-primary dark:text-white mt-4'>
                    <div className='w-full flex flex-row items-center'>
                        <input type="checkbox" className="w-4 h-4 mr-2" />
                        <p className='text-sm '>Remember Me for 30 days</p>
                    </div>

                    <div className='w-full'>
                    <p className='text-sm cursor-pointer  underline underline-offset-2 text-right text-primary dark:text-white'>Forgot Password</p>
                    </div>
                </div>

                <div className='w-full flex flex-col'>
                    <button className='w-full text-white dark:text-white bg-primary dark:bg-dark rounded-lg border-lg border-white border p-4 text-center flex items-center justify-center mt-4' onClick={handleLoginButton}>
                        Log in
                    </button>
                    <div className='w-full flex items-center justify-center mt-4'>
                    <p className='text-primary dark:text-white '>Don't have an Account?</p>
                    </div>
                    

                    <button className='w-full text-primary dark:text-primary bg-white dark:bg-white border-lg border-primary border rounded-lg p-4 text-center flex items-center justify-center mt-4'>
                        Sign Up Here
                    </button>
                </div>
            </div>
            
        </div>
    
    </>
    
  )
}

export default Login