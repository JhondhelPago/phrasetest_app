import React, { useState } from 'react'
import styles from '../style';
import axios from 'axios';


const Student = () => {

    const [UserName, SetUserName] = useState('');
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [ConfirmPassword, SetConfirmPassword] = useState('');
    const [FirstName, SetFirstName] = useState('');
    const [MiddleName, SetMiddleName] = useState('');
    const [LastName, SetLastName] = useState('');
    const [Age, SetAge] = useState(0);
    const [Gender, SetGender] = useState('');
    const [SchoolName, SetSchoolName] = useState('');
    const [GradeLevel, SetGradeLevel] = useState('');
    const [Insti_id, SetInsti_id] = useState('');
    

    const UpdateUserNameState = (event) => {
        SetUserName(event.target.value);
    }

    const UpdateEmailState = (event) => {
        SetEmail(event.target.value);
    }

    const UpdatePasswordState = (event) => {
        SetPassword(event.target.value);
    }

    const UpdateConfirmPassword = (event) => {
        SetConfirmPassword(event.target.value);
    }

    const UpdateFirstNameState = (event) => {
        SetFirstName(event.target.value);
    }

    const UpdateMiddleNameState = (event) => {
        SetMiddleName(event.target.value);
    }

    const UpdateLastNameState = (event) => {
        SetLastName(event.target.value);
    }

    const UpdateAgeState = (event) => {
        SetAge(parseInt(event.target.value));
    }

    const UpdateGenderState = (event) => {
        SetGender(event.target.value);
    }

    const UpdateSchoolName = (event) => {
        SetSchoolName(event.target.value);
    }

    const UpdateGradeLevel = (event) => {
        SetGradeLevel(event.target.value);
    }

    const UpdateInsti_idState = (event) => {
        SetInsti_id(event.target.value);
    }


    const HandleSubmitButton = async() => {

        //logs the useStates
        // const [UserName, SetUserName] = useState('');
        // const [Email, SetEmail] = useState('');
        // const [Password, SetPassword] = useState('');
        // const [ConfirmPassword, SetConfirmPassword] = useState('');
        // const [FirstName, SetFirstName] = useState('');
        // const [MiddleName, SetMiddleName] = useState('');
        // const [LastName, SetLastName] = useState('');
        // const [Age, SetAge] = useState(0);
        // const [Gender, SetGender] = useState('');
        // const [SchoolName, SetSchoolName] = useState('');
        // const [GradeLevel, SetGradeLevel] = useState('');
        // const [Insti_id, SetInsti_id] = useState('');

        console.log('Username', UserName);
        console.log('Email', Email);
        console.log('Password', Password);
        console.log('ConfirmPassword', ConfirmPassword);
        console.log('FirstName', FirstName);
        console.log('MiddleName', MiddleName);
        console.log('LastName', LastName);
        console.log('Age', Age);
        console.log('Gender', Gender);
        console.log('SchoolName', SchoolName);
        console.log('GradeLevel', GradeLevel);
        console.log('Insti_id', Insti_id);


        // check the Password and ConfirmPassword if identical,
        // do not sent the POST request if the Password and ConfirmPassword
        // setup the axios post request then pass the route to the server that handles the  signup method for the student
        // check ther return of the reponse.data.email_exist, if the value is True then render a modal to let the user know that the email is already taken, else continue to the otp page


        if (Password !== ConfirmPassword){
            //modals here that will render to let the user know of password and confirmpassword is not match.

            alert('password and confirm password did not match.');

        } else {
            //control flow axios post request

            const response = await axios.post(`auth/student/signup`, {

                "username" : UserName,
                "email" : Email,
                "password" : Password,
                "first_name" : FirstName,
                "middle_name" : MiddleName,
                "last_name" : LastName,
                "age" : Age,
                "gender" : Gender,
                "gradelevel" : GradeLevel,
                "school_name" : SchoolName,
                "institutional_id" : Insti_id
            })





        }


    }


    return (

    <>
       
        <div className={`flex flex-col w-full items-center justify-center xs:w-full font-poppins`}>

            <h1 className='text-2xl font-bold mt-3
             text-primary dark:text-white mb-5'>
            Welcome! MAH Boi _________ Lapag Your Deets.
            </h1>

            <div className={`${styles.boxWidth}flex flex-col items-center justify-center w-full h-full`}>

                
                <div className='flex flex-row w-full items-start'>
                
                {/*Email Side*/}
                <div className='flex flex-col w-1/2'>
                    <div className=' text-base font-thin  text-primary dark:text-white'>
                        Email<span className='text-red-500'>*</span>
                    </div>
                
                    <div className='w-full flex flex-col'>
                        <input type="email" placeholder=" Email" className='w-11/12 text-primary pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateEmailState}/>
                    </div>
                </div>
                
                {/*Username Side*/}
                <div className='flex flex-col w-1/2'>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Username<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input type="email" placeholder=" Username" className='w-full text-primary pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateUserNameState}/>
                    </div>
                </div>

                </div>
                
                <div className='flex flex-row w-full items-start'>
                
                {/*First Name Side*/}
                <div className='flex flex-col w-1/3'>
                    <div className=' text-base font-thin  text-primary dark:text-white'>
                        First Name<span className='text-red-500'>*</span>
                    </div>
                
                    <div className='w-full flex flex-col '>
                        <input required type="text" placeholder=" First Name" className='w-11/12 text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateFirstNameState}/>
                    </div>
                </div>
                
                {/*Middle Name Side*/}
                <div className='flex flex-col w-1/3 '>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Middle Name<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input required type="text" placeholder=" Middle Name" className='w-11/12 text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateMiddleNameState}/>
                    </div>
                </div>

                 {/*Last Name Side*/}
                 <div className='flex flex-col w-1/3'>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Last Name<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input required type="text" placeholder=" Last Name" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateLastNameState}/>
                    </div>
                </div>

                </div>


                <div className='flex flex-row w-full items-start'>
                
                        {/*Age Side*/}
                        <div className='flex flex-col w-1/2 pr-2'>
                            <div className=' text-base font-thin  text-primary dark:text-white'>
                                Age<span className='text-red-500'>*</span>
                            </div>
                        
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateAgeState}/>
                            </div>
                        </div>
                        
                        {/*Gender Side*/}
                        <div className='flex flex-col w-1/2 pl-2'>
                            <div className='flex  text-base font-thin text-primary dark:text-white'>
                                Gender<span className='text-red-500'>*</span>
                            </div>

                            <div className='w-full flex flex-col'>
                                <select for="gender" type="email" placeholder=" Username" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateGenderState}>
                                <option value={''} disabled selected> Select your Gender</option>
                                <option value={1}>Male</option>
                                <option value={1}>Female</option>
                                </select>
                            </div>
                        </div>

                </div>


                
                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white'>
                    School Name<span className='text-red-500'>*</span>
                </div>
                
                <div className='w-full flex flex-col'>
                    <input type="text" placeholder="SchoolName" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateSchoolName} />
                </div>
                </div>

                <div className='flex flex-row w-full items-start'>
                
                        {/*Age Side*/}
                        <div className='flex flex-col w-1/2 pr-2'>
                            <div className=' text-base font-thin  text-primary dark:text-white'>
                                Grade Level<span className='text-red-500'>*</span>
                            </div>
                        
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateGradeLevel}/>
                            </div>
                        </div>
                        
                        {/*Gender Side*/}
                        <div className='flex flex-col w-1/2 pl-2'>
                            <div className='flex  text-base font-thin text-primary dark:text-white'>
                                School/Institutional ID<span className='text-red-500'>*</span>
                            </div>

                            <div className='w-full flex flex-col '>
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4' onChange={UpdateInsti_idState}/>
                            </div>
                            </div>
                        </div>

                </div>
                
                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white'>
                    Password<span className='text-red-500'>*</span>
                </div>

                <div className='w-full flex flex-col'>
                    <input type="password" placeholder=" Password" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none' onChange={UpdatePasswordState}/>
                </div>
                </div>

                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white mt-4'>
                    Confirm Password<span className='text-red-500'>*</span>
                </div>

                <div className='w-full flex flex-col'>
                    <input type="password" placeholder="Confirm Password" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none' onChange={UpdateConfirmPassword}/>
                </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center mt-4'>
                    
                    <button className='w-1/2 text-white dark:text-primary bg-primary dark:bg-white border-lg border-primary border rounded-lg p-4 text-center flex items-center justify-center mt-4' onClick={HandleSubmitButton}>
                        Submit
                    </button>
                </div>
            </div>
            
        </div>
    
    </>
    
  )
}

export default Student