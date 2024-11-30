import React from 'react'
import styles from '../style'
import { ReqAccessTokenSuperScope, StudentAPICalls } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

const StudentComponent = () => {

  const navigate = useNavigate();


  //function here to check the refresh and access token is validated, place the function inside the initial render useEffect()
  //if access is invalid get new access using the refresh
  //if refresh is invalid, route the user to the login


  const [Username, SetUsername] = useState('');
  const [Section, SetSection] = useState('');

  const [AssingnmentList, SetAssignmentList] = useState([]);
  const [CurrentAssignment, SetCurrentAssignment] = useState(0);


  const getUserStudentData = async() => {

    try{

      const response = await StudentAPICalls.loadStudentInfo()

      if (response.status == 200){
        console.log(response.data);
        
        //get the information needed
        SetUsername(response.data.username);
        SetSection(response.data.section);
        localStorage.setItem('section', response.data.section);
        
      }

    } catch (error) {

      //unauthorized token
      if (error.response.status == 401){
        console.log(`getUserStudentData 401 control flow`);

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          //back to login
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200){
          localStorage.setItem('access', Re_request_access['result'].data.access)

          try{

            const response = await StudentAPICalls.loadStudentInfo();

            console.log(`status code of second attemp of StudentAPICalls.loadStudentInfo() : ${response }`)

            if (response.status == 200){
              SetUsername(response.data.username);
              SetSection(response.data.section);
              localStorage.setItem('section', response.data.section);
            } else {
              console.log(`status code of second attemp of StudentAPICalls.loadStudentInfo() : ${response.status}`);
              console.log(response.status);
            }
          } catch  (error) {
            console.log(error);
          }
        } else {
          console.log(error.response.statut);
        }
      }
    }
  }

  const StudentAssignment = async () => { 
    
    try{

      const response = await StudentAPICalls.Assignment_list();

      if (response.status == 200){
        console.log(response.data.assignments)
        SetAssignmentList(response.data.assignments);
      }
    } catch (error) {

      if (error.response.status == 401){
        
        try{

          const Re_request_access = await ReqAccessTokenSuperScope();

          if (Re_request_access['status_code'] == 401){
            BackToLogin();
          } else if (Re_request_access['status_code'] == 200){
            localStorage.setItem('access', Re_request_access['result'].data.access)

            try{

              const response = await StudentAPICalls.Assignment_list();

              if (response.status == 200){
                console.log(response.data.assignments);
                SetAssignmentList(response.data.assignments);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch(error) {
          console.log(error);
        }
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

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  const RouteToAnswerAssignment = () => {
    navigate('/studentessaytask');
  }

  const RouteToExamineResult = ()=> {
    navigate('/examineresults');
  }

  useEffect(() => {
    getUserStudentData();
    
  }, []);

  useEffect(() => {
    StudentAssignment();

  }, [Section])
  

  return (
    <>

    <div className='relative'>
      <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
      style={{ top: '100%', right: '100%', transform: 'translate(-0%, -10%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '100%', left: '40%', transform: 'translate(-50%, -0%)' }}></div>
      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '100%', left: '60%', transform: 'translate(-50%, -0%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
      style={{ top: '100%', left: '100%', transform: 'translate(-0%, -10%)' }}></div>

    <div className=' relative z-10 flex flex-col font-poppins bg-transparent flex-grow-0'>
      <div className='flex items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
          <span className='font-semibold'>Good Day Sunshine, </span> {Username}!
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center p-4 text-white dark:text-white'>
      <div className='flex flex-col w-full'> 
          <div className='text-primary dark:text-white text-xl w-full sm:w-full md:w-7/12 justify-start font-semibold p-4 sm:text-center md:text-center'>
              Here's your essay Tasks! 
          </div>
      </div>
      </div>

      <div className=' relative z-10 flex flex-col items-center'>
        {/* Large Gray Div */}
        
        {/* Small Gray Divs */}
        <div className='flex flex-row items-center justify-center text-center'>
          <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-14 w-full text-primary'>

            {AssingnmentList.map((assignmentObj, index) => (

                <div className='w-28 h-28 bg-violet-300 dark:bg-blue-300 bg-opacity-60 dark:bg-opacity-60 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl cursor-pointer border border-blue-900' onClick={() => {UpdateCurrentOpenedAssignment(assignmentObj.id)}}>
                  <p>{assignmentObj.assignment_no}</p>
                </div>

            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default StudentComponent