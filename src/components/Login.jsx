import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import axios from 'axios';

import { AlertModal } from '../modal';

const Login = () => {

    const navigate = useNavigate();
    const [IsAlertModalShow, SetIsAlertModalShow] = useState(false);


    // setup useState variable here to contain the login credentials

    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');

    // setup a function here handle the login button, a function to submit the required informatin to the axios with post method

    const handleLoginButton = async() => {

        console.log(`Email: ${Email}`);
        console.log(`Password : ${Password}`)

    
        //try catch block here to handles the invalid login form input

        try{

            const response =  await axios.post(`http://127.0.0.1:8000/user/auth/login`, {
                'email' : Email,
                'password' : Password
            });
    
            const refresh_access = response.data.token;
    
            console.log(refresh_access);
            console.log(refresh_access.refresh);
            console.log(refresh_access.access);
    
            if ((refresh_access.refresh !== '') && (refresh_access.access !== '')){
    
    
                console.log(`save the refresh and access token to localStrorage`);
                localStorage.setItem('refresh', refresh_access.refresh);
    
                localStorage.setItem('access', refresh_access.access);
    
                localStorage.setItem('user_type', response.data.user_type);

                localStorage.setItem('email', response.data.email)
                
                if (response.data.user_type === "student") {
                    routeToStudentPage();
    
                } else {
                    routeToTeacherPage();
    
                }
    
            }else{
                
                console.log(`clear the useState variable`);
    
                SetEmail('');
                SetPassword('');
    
                alert('in valid login credentials');
    
                
            }

        } catch(error) {

            if (error.response.status == 401){
                console.log(error.response.data);
                SetIsAlertModalShow(true);
            } else {
                console.log(error);
                alert('server is not responding.');
            }


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

   const routeToStudentPage = () => {
        navigate('/studentpage');
   }

   const routeToTeacherPage = () => {
    navigate('/teacherpage');
}

    const routeToSignUpSelect = () => {

        navigate('/signuppage');
    }


  return (

    <>
       
       <div className={`flex flex-col w-full items-center justify-center min-h-screen xs:w-full font-poppins`}>

            <h1 className='text-2xl font-bold text-primary dark:text-white mb-10'>
            Welcome! Please Enter Your Details.
            </h1>

            <div className="flex flex-col justify-items-start w-full h-full">
                <div className='text-xl font-thin  text-primary dark:text-white'>
                    Email<span className='text-red-500'>*</span>
                </div>
                <div className='w-full flex flex-col'>
                    <input type="email" placeholder=" Email" className='w-full text-primary pl-2  mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={EmailFieldUpdateChange} value={Email}/>
                </div>

                <div className='text-xl font-thin  text-primary dark:text-white'>
                    Password<span className='text-red-500'>*</span>
                </div>
                <div className='w-full flex flex-col'>
                    <input type="password" placeholder=" Password" className='w-full text-primary pl-2  mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none' onChange={PasswordFieldUpdateChange} value={Password}/>
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
                    

                    <button className='w-full text-primary dark:text-primary bg-white dark:bg-white border-lg border-primary border rounded-lg p-4 text-center flex items-center justify-center mt-4' onClick={routeToSignUpSelect}>
                        Sign Up Here
                    </button>
                </div>
            </div>

            {IsAlertModalShow && (
                <AlertModal message={'Invalid email and password.'} alter_boolean_state={SetIsAlertModalShow}></AlertModal>
            )}
            
        </div>


    
    </>
    
  )
}

export default Login