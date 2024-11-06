import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbstractEssayAssignment } from '../module/EssayTask_utils';
import { TeacherApiCalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import styles from '../style'

const CreateTask = () => {

  const navigate = useNavigate();

  const [Context, SetContext] = useState('');
  const [Question, SetQuestion] = useState([]);
  const [DueDate, setDueDate] = useState('');
  const [DueTime, setDueTime] = useState('');

  const Update_ContextState = (event) => {
    SetContext(event.target.value);
  }

  const Update_QuestionState = (event) => {
    SetQuestion(event.target.value);
  }

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleDueTimeChange = (event) => {
    setDueTime(event.target.value);
  };

  const handlePostButton = async (event) => {
    event.preventDefault();

    console.log(Context);
    console.log(Question);

    // if (empty_string_checker(Context)){
    //   alert(`context field should not be empty`);
    //   return
    // }

    // if (empty_string_checker(Question)){
    //   alert(`question field should not be empty`);

    // }

    // console.log(`context: ${Context}`);
    // console.log(`question: ${Question}`);

    try{

      const response = await TeacherApiCalls.CreateEssayAssignment(localStorage.getItem('Current_Section'), Context, [Question]);

      // the api endpoint returns status code 201 created
      if (response.status == 201){ 
        console.log('Back  to teacherpage');
        BackToTeacherPage();
      } else {
        console.log('status_code:', response.status)
      }

    } catch (error) {
      console.log(error);

      // 401 status handler
      if (error.response.status == 401) {
        //unauthorize because of expired token
        console.log('401 handler block');

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200){

          localStorage.setItem('access', Re_request_access['result'].data.acess);

          try{

            const response = await TeacherApiCalls.CreateEssayAssignment(localStorage.getItem('Current_Section'), Context, [Question],DueDate,DueTime);

            // the api endpoint returns status code 201 created
            if(response.status == 201){
              alert('Assignment Created');
              BackToTeacherPage();
            } else {
              alert('Assignment  unhandle status: ', response.status);
              console.log(response.data);
              BackToTeacherPage();
            }

          } catch (error){
            console.log(error);
          }
        } else {
          console.log("Re_request_access status code:", Re_request_access['status_code']);
          console.log(Re_request_access['result']);
        }
      }
    }
  }


  const empty_string_checker = (string) => {
    if (string === ''){
      return true;
    }else{
      return false;
    }
  }

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  const BackToTeacherPage = () => {
    navigate('/teacherpage');
  }

  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
        
    <div className='w-9/12  flex flex-row items-center justify-end text-xl pt-4 text-primary dark:text-white text-center'>
          
            <button className='text-primary dark:text-white bg-white dark:bg-primary border mt-2 md:mt-0 lg:mt-0 border-violet-500 rounded-lg p-2 px-4 text-xs'>
                    Class Code : 123456 {localStorage.getItem('Current_Section')}
                  </button>
          </div>  
        
      
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        

        <div className='flex flex-col w-full'> 
            <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
                Short context of your Question
            </div>
        
            <div>
                <textarea placeholder="Question Context" className="w-7/12 pl-2 pt-2 pb-7 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text" onChange={Update_ContextState}></textarea>
            </div>
        </div>

      </div>

      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        

        <div className='flex flex-col w-full'> 
            <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
                Create An Essay Question
            </div>
        
            <div>
                <textarea placeholder="Question 1" className="w-7/12 pl-2 pt-2 pb-52 sm:pb-40 md:pb-30 lg:pb-20 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text" onChange={Update_QuestionState}></textarea>
            </div>
        </div>

      </div>
      
      <div className='flex flex-col xxs:flex-row items-center justify-center my-6'>
          <div className='flex flex-col mx-4'>
            <div className='text-primary dark:text-white text-xl font-semibold mb-2 text-center'>
              Due Date
            </div>
            <input type="date" className=" pl-2 pt-2 pb-2 border rounded-lg text-start text-primary dark:text-white bg-white dark:bg-primary border-violet-500" onChange={handleDueDateChange} />
          </div>

          <div className='flex flex-col mx-4'>
            <div className='text-primary dark:text-white text-xl font-semibold mb-2 mt-2 xxs:mt-0 text-center'>
              Due Time
            </div>
            <input type="time" className="pl-2 pt-2 pb-2 border rounded-lg text-start text-primary dark:text-white bg-white dark:bg-primary border-violet-500" onChange={handleDueTimeChange} />
          </div>
        </div>
        {/* <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

            <div className='flex flex-col w-full'> 
                <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
                Create An Essay Question
                </div>

                <div>
                <textarea placeholder="Question 2" className="w-7/12 pl-2 pt-2 pb-52 sm:pb-40 md:pb-30 lg:pb-20 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text"></textarea>
                </div>
            </div>

        </div> */}

        <div className='flex flex-row items-center  justify-center mt-6'>
        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white mb-4'>

            <button className='flex font-semibold text-white dark:text-primary bg-blue-500 dark:bg-blue-500 rounded-lg border-lg border-white dark:border-primary border mr-4 p-4 px-16 text-center'>
                Add New Question   
            </button>
        <div className='flex flex-col items-center justify-evenly text-center text-white dark:text-white mb-4 mt-4'>
            <button className='flex font-semibold text-white dark:text-primary bg-green-600 dark:bg-green-600 rounded-lg border-lg border-white dark:border-primary border p-4 px-16 text-center' onClick={handlePostButton}>
                Post        
            </button>
        </div>
        </div>
        </div>
        

    </div>
    </>
  )
}

export default CreateTask