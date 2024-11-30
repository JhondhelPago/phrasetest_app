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
  const [Confirmation, SetConfirmation] = useState(false);

  const [IsAlertModalShow, SetIsAlertModalShow] = useState(false);
  const [AlertModalMessage, SetAlertModalMessage] = useState('');

  const [IsLoadingModalShow, SetIsLoadingModalShow] = useState(false); 

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  }

  const SetConfirmationTrueAndCloseModal = () => {
    SetConfirmation(true);
    setShowNotificationModal(false);
    SubmitHandlerMain();
  }

  const SetConfirmationFalseAndCloseModal = () => {

    setShowNotificationModal(false);
  }

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

    if (EssayComposition == '') {
      SetAlertModalMessage('you can not submit empty composition');
      SetIsAlertModalShow(true);
      return;
    }

    //contion here to for submission confirmation using the modal

    setShowNotificationModal(true);

  }

  const SubmitHandlerMain = async () => {
    SetIsLoadingModalShow(true);
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
    <div className='relative'>
    <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
      style={{ top: '30%', right: '100%', transform: 'translate(-0%, -10%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '30%', left: '40%', transform: 'translate(-50%, -0%)' }}></div>
      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '30%', left: '60%', transform: 'translate(-50%, -0%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
      style={{ top: '30%', left: '100%', transform: 'translate(-0%, -20%)' }}></div>
    
    <div className='relative z-10 flex flex-col font-poppins bg-transparent flex-grow-0'>
        
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center text-white dark:text-white'>

        <div className='flex flex-col w-full'> 
            <div className='flex justify-center text-center align-center text-primary dark:text-white text-xl w-full  font-semibold p-7'>
            Context 1 :  {AssignmentDetails && AssignmentDetails.context_question.context} 
            </div>
        
            <div className='w-full flex flex-row items-center justify-center'>
                <textarea placeholder="Question 1" className="w-10/12 h-full sm:w-9/12 md:w-10/12 lg:w-8/12 pl-2 pt-2 pb-96 sm:pb-80 md:pb-72 lg:pb-[500px] border rounded-lg justify-start text-start text-white  bg-primary bg-opacity-60  border-gray-300" type="text" onChange={UpdateEssayComposition}></textarea>
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
          <NotificationModal message={'Confirm submission of composition?'} callback_cancel={SetConfirmationFalseAndCloseModal} callback_confirm={SetConfirmationTrueAndCloseModal}></NotificationModal>
        )}

        {IsAlertModalShow && (
          <AlertModal message={AlertModalMessage} alter_boolean_state={SetIsAlertModalShow}></AlertModal>
        )}

        {IsLoadingModalShow && (
          <LoadingModal message={'Examining the compositon. It may take a short while thereupon please wait.'}></LoadingModal>
        )}
    </div>
    </div>
    </>
  )
}

export default OngoingTask