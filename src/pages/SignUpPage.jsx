import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import { logo, student, teacher } from '../assets';

import { Button } from "../components";

const SignUpPage = ({isDark, changeColorTheme}) => {

    const navigate = useNavigate();

    const routeToStudentSignUp = () => {
        
        navigate('/studentsignup');

    }

    const routeToTeacherSignup = () => {

        navigate('/teachersignup');

    }

    return (
        <div className={!isDark && 'dark'}>
            <section className='bg-white dark:bg-primary w-full h-screen flex flex-col md:flex-row items-start font-poppins'>
                {/* Student Section */}
                <div className='bg-primary dark:bg-white relative w-full md:w-1/2 h-full flex flex-col border-r-2 border-violet-400'>
                    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                        <div className={`${styles.boxWidth}`}>
                            <img src={logo} alt="phrasetest" className="w-[256px] h-[64px] mt-4" />
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col items-center justify-center '>
                        <img src={student} alt="student" className="w-[128px] h-[128px]" />
                        <button className='w-[200px] text-white dark:text-primary bg-primary dark:bg-white rounded-lg border-lg border-white dark:border-primary border p-4 text-center mt-4 mb-20' onClick={routeToStudentSignUp}>
                            Student
                        </button>
                    </div>
                </div>

                {/* Teacher Section */}
                <div className='relative w-full md:w-1/2 h-full flex flex-col items-center justify-center border-l-2 border-violet-400'>
                    <div className='flex flex-1 flex-col items-center justify-center '>
                        <img src={teacher} alt="teacher" className="w-[128px] h-[128px]" />
                        <button className='w-[200px] text-primary dark:text-white bg-white dark:bg-primary rounded-lg border-lg border-primary border dark:border-white p-4 text-center mt-4' onClick={routeToTeacherSignup}>
                            Teacher
                        </button>
                        <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUpPage;
