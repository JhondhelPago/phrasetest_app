import React from 'react'
import styles from '../style';


const Login = () => {
  return (

    <>
    <div className={`${styles.paddingX} ${styles.paddingY}  w-full items-center justify- xs:w-full font-poppins`}>

        <h1 className='text-2xl font-bold mt-14  text-primary mb-10'>
        Welcome! Please Enter Your Details.
        </h1>

        <div className="flex flex-col justify-items-start w-full h-full">
            <div className='text-xl font-thin  text-primary '>
                Email<span className='text-red-500'>*</span>
            </div>
            <div className='w-full flex flex-col'>
                <input type="email" placeholder=" Email" className='w-full text-primary dark:text-white mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
            </div>

            <div className='text-xl font-thin  text-primary '>
                Password<span className='text-red-500'>*</span>
            </div>

            <div className='w-full flex flex-col'>
                <input type="password" placeholder=" Password" className='w-full text-primary dark:text-white mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none'/>
            </div>
            
            <div className='w-full flex items-center justify-between text-primary dark:text-white mt-4'>
                <div className='w-full flex flex-row items-center'>
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className='text-sm '>Remember Me for 30 days</p>
                </div>

                <div className='w-full'>
                <p className='text-sm cursor-pointer  underline underline-offset-2 text-right'>Forgot Password</p>
                </div>
            </div>

            <div className='w-full flex flex-col'>
                <button className='w-full text-white dark:text-primary bg-primary dark:bg-white rounded-lg p-4 text-center flex items-center justify-center mt-4'>
                    Log in
                </button>
                <div className='w-full flex items-center justify-center mt-4'>
                <p className='text-primary dark:text-white '>Don't have an Account?</p>
                </div>
                

                <button className='w-full text-white dark:text-primary bg-primary dark:bg-white rounded-lg p-4 text-center flex items-center justify-center mt-4'>
                    Sign Up Here
                </button>
            </div>
        </div>
        
    </div>
    </>
    
  )
}

export default Login