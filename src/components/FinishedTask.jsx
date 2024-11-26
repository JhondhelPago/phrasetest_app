import React, { useEffect, useState } from 'react';
import { StudentAPICalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import styles from '../style'
import { useNavigate } from 'react-router-dom';

const FinishedTask = () => {

  const navigate = useNavigate();

  const [AssingmentList, SetAssignmentList] = useState([]);

  const StudentAssignmentFinished = async () => {

    try{

      const response = await StudentAPICalls.FinishedTask();

      if (response.status == 200) {
        console.log(response.data.assignment_finished)
        SetAssignmentList(response.data.assignment_finished);
      }

    } catch (error) { 

      if (error.response.status == 401) {

        try{

          const Re_request_access = await ReqAccessTokenSuperScope();

          if (Re_request_access['status_code'] == 401){
            BackToLogin();
          } else if (Re_request_access['status_code'] == 200) {
            localStorage.setItem('access', Re_request_access['result'].data.access);
            
            try{

              const response = await StudentAPICalls.FinishedTask();

              if (response.status == 200) {
                console.log(response.data.assignment_finished)
                SetAssignmentList(response.data.assignment_finished);
              }

            } catch(error) {
              console.log(error)
            }
          }
        } catch(error) {
          console.log(error);

        } 
      } else {
        console.log(error);
      }
    }
  }


  const UpdateCurrentOpenedAssignment = async(id) => {

    localStorage.setItem('assignment_id', id);
    console.log(`current assignment_id : ${id}`);

    //check if the assignment is done
    //if done get the assignment_composition_id, save to the local Storage then route to the examine result
    //else route to the studentessaytask

    try{

      const response = await StudentAPICalls.CheckEssaySubmit(id);

      if(response.status == 200){

        if (response.data.found == true){
          console.log('assignment_submitted');
          RouteToExamineResult();
        } else {
          console.log('assignment_not_submitted');
          RouteToAnswerAssignment();
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response.status == 401){

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200) {
          localStorage.setItem('access', Re_request_access['result'].data.access);

          try {

            const response = await StudentAPICalls.CheckEssaySubmit(id);

            if(response.status == 200){

              if (response.data.found == true){
                console.log('assignment_submitted');
                RouteToExamineResult();
              } else {
                console.log('assignment_not_submitted');
                RouteToAnswerAssignment();
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      } 
    }
  }

  const RouteToAnswerAssignment = () => {
    navigate('/studentessaytask');
  }

  const RouteToExamineResult = ()=> {
    navigate('/examineresults');
  }  

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  useEffect(() => {

    StudentAssignmentFinished();

  }, []);


  return (
    <>
    <div className='relative'>

    <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
       style={{ bottom: '30%', right: '100%' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
       style={{ top: '60%', left: '40%', transform: 'translate(-50%, -30%)' }}></div>
       <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
       style={{ top: '60%', left: '60%', transform: 'translate(-50%, -30%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
       style={{ top: '80%', left: '100%' }}></div>


    <div className='relative z-10 flex flex-col font-poppins bg-transparent flex-grow-0'>
      <div className='flex items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
          Good Job, (student name)!
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center p-4 text-white dark:text-white'>
      <div className='flex flex-col w-full'> 
          <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
            Accomplishments!
          </div>
      </div>
      </div>

      <div className='flex flex-col items-center'>
        {/* Large Gray Div */}
        
        {/* Small Gray Divs */}
        <div className='flex flex-row items-center justify-center text-center'>
          <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-14 w-full text-primary'>
            
            {AssingmentList.map((assignmentObj, index) => (

               <div id={index} key={index} className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer' onClick={() => {UpdateCurrentOpenedAssignment(assignmentObj.id)}}>
                  <p>{assignmentObj.assignment_no}</p>
                </div>

            ))}

            {/* <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 2</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 3</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 4</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 5</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 6</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer'>
              <p>Essay Activity 7</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default FinishedTask;