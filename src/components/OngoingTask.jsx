import React, { useEffect, useState } from 'react'
import styles from '../style'
import { StudentAPICalls, TeacherApiCalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

import { NotificationModal, AlertModal, LoadingModal } from '../modal';


const OngoingTask = () => {

  const navigate = useNavigate();

  const [AssignmentDetails, SetAssignmentDetials] = useState(null);


  const [EssayComposition, SetEssayComposition] = useState('');

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  };

  const UpdateEssayComposition = (event) => {
    SetEssayComposition(event.target.value);
  }

  const fetchAssignmentDetails = async () => {

    console.log('fetchAssignmentDetails block is running');
    try{

      const response = await TeacherApiCalls.CurrentAssignmetStateDetails(localStorage.getItem('assignment_id'));

      if (response.status == 200){
        console.log(response.data);
        SetAssignmentDetials(response.data);
      }

    } catch (error){
      console.log(error);

      if (error.response == 401){

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200){
          localStorage.setItem('access', Re_request_access['result'].data.access);

          try{

            const response = await TeacherApiCalls.CurrentAssignmetStateDetails(localStorage.getItem('assignment_id'));

            if(response.status == 200){
              console.log(response.data);
              SetAssignmentDetials(response.data);
            }
          } catch (error){
            console.log(error);
          }
        }
      }
    }
  }

  const SubmitHandler = async (event) => {
    event.preventDefault();
    toggleNotificationModal();
    try{
      
      const response = await StudentAPICalls.SubmitEssay(EssayComposition, localStorage.getItem('assignment_id'));

      if (response.status == 200){

        //navigate to examineresults path and then fetch the information using the assignment_id,  and the student_id from access token
        RouteToExamineResult();

      }

    } catch (error) {
      console.log(error);

      if (error.response.status == 401){

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200){
          localStorage.setItem('access', Re_request_access['result'].data.access)

          try{

            const response = await StudentAPICalls.SubmitEssay(EssayComposition, localStorage.getItem('assignment_id'));

            if (response.status == 200){
               //navigate to examineresults path and then fetch the information using the assignment_id,  and the student_id from access token
              RouteToExamineResult();
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log(error);
      }
    }
  }

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  const RouteToExamineResult = () => {
    navigate('/examineresults');
  }

  useEffect(() => {
    fetchAssignmentDetails();
  }, []);

  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
        
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        <div className='flex flex-col w-full'> 
            <div className='flex justify-center text-center align-center text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12  font-semibold p-7'>
            Context 1 :  {AssignmentDetails && AssignmentDetails.context_question.context} 
            </div>
        
            <div>
                <textarea placeholder="Question 1" className="w-10/12 h-full sm:w-9/12 md:w-10/12 lg:w-8/12 pl-2 pt-2 pb-96 sm:pb-80 md:pb-72 lg:pb-60 border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text" onChange={UpdateEssayComposition}></textarea>
            </div>
        </div>

      </div>

        

        <div className='flex flex-row items-center  justify-center mt-6'>
        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white mb-4'>

        <div className='flex flex-col items-center justify-evenly text-center text-white dark:text-white'>
            <button className='flex font-semibold text-white dark:text-primary bg-green-600 dark:bg-green-600 rounded-lg border-lg border-white dark:border-primary border p-4 px-16 text-center' onClick={SubmitHandler}>
                Submit        
            </button >
        </div>
        </div>
        </div>
        {showNotificationModal && (
        // <NotificationModal toggleNotificationModal={toggleNotificationModal} setShowNotificationModal={setShowNotificationModal} />
        // <AlertModal message={'invalid section code'} setShowNotificationModal={setShowNotificationModal}></AlertModal>
          <LoadingModal></LoadingModal>
      )}
    </div>
    </>
  )
}

export default OngoingTask