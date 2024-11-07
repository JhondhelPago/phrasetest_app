import React, { useEffect, useState } from 'react'
import styles from '../style'
import { axiosInstance, axiosRefresh } from '../module/axiosInstances';
import { loadTeacherInfo, TeacherApiCalls, ReqAccessToken, ReqAccessTokenSuperScope, DirectToLogin } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

const TeacherComponent = () => {

  const navigate = useNavigate();
  const [showStudentList, setShowStudentList] = useState(false);
  const [showModalSection, setShowModalSection] = useState(false); // Modal state
  const [newSectionName, setNewSectionName] = useState(''); // New section name input
  

  const [Username, SetUsername] = useState('');

  const [SectionList, SetSectionList] = useState([]);

  const [Current_Section, SetCurrent_Section] = useState('');
  const [Current_Assignment_id, SetCurrent_Assignment_id] = useState(0);

  const [Current_AssignmentObj, SetCurrent_AssignmentObj] = useState(null);

  const [AssignmentOnThisSection, SetAssignmentOnThisSection] = useState([]); // related to the fetch_Current_SectionDetails

  const TeacherInfo = async () => {

    try {
        console.log(`teacher access token: ${localStorage.getItem('access')}`);

        const response = await TeacherApiCalls.loadTeacherInfo();

        if (response.status === 200){

          console.log(response); // Log the response

          SetUsername(response.data.username);

        }

    } catch (error) {

      console.log('error scope');
      console.log(error.response.status);
      
      if (error.response.status == 401) {
        //console.log('error 401 scope');
        let Re_request_access = await ReqAccessTokenSuperScope();
        // console.log(Re_request_access)
        // console.log(Re_request_access['status_code']);

        if (Re_request_access['status_code'] == 401){
          
          console.log('navigating back to login');
          BackToLogin();

        } else if (Re_request_access['status_code'] == 200){
          
          console.log('new access toekn set.');
          // update the access token here in the localStorage.setItem()
          localStorage.setItem('access', Re_request_access['result'].data.access);

          try{

            const response = await TeacherApiCalls.loadTeacherInfo();
            
            if(response.status == 200){
              SetUsername(response.data.username);
            } 

          } catch (error) {
            console.log(error);
            BackToLogin();
          }
        }

      }
      // //end block of 401 control flow
    }
  } 

  const TeacherSection = async () => {

    try{

      const response = await TeacherApiCalls.associatedSections();

      if (response.status == 200){
        console.log(response.data);
        SetSectionList(response.data.section_list);
        SetCurrent_Section(response.data.section_list[0]['section_code']);
      }

    } catch(error) {
      
      if (error.response.status === 401){
        // get new access token using the refresh token

        let Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          
          BackToLogin();

        } else if (Re_request_access['status_code'] == 200){
          // set new access token to the localStorage.setItem()
          localStorage.setItem('access', Re_request_access['result'].data.access);

          try{

            const response = await TeacherApiCalls.associatedSections();

            if (response.status == 200) {
              SetSectionList(response.data.section_list);
              SetCurrent_Section(response.data.section_list[0]['section_code']);  
            }

          } catch (error) {
            console.log(error);
            BackToLogin();
          }
        }
      }
    }
  } 

  // this gunctiom is subject to be test
  const fetch_Current_AssignmentDetails = async () => {

    try{

      const response  = await TeacherApiCalls.CurrentAssignmetStateDetails(Current_Assignment_id);

      if (response.status == 200){
        console.log(response.data);
        SetCurrent_AssignmentObj(response.data);
        //get the three list and store to the useState variable using a sigle function that update the three state
      }


    } catch (error) {
      console.log(error);

      if (error.response.status == 401){

        try{

          const Re_request_access = await ReqAccessTokenSuperScope();

          if (Re_request_access['status_code'] == 401){
            
            BackToLogin();

          } else if (Re_request_access['status_code'] == 200) {
            
            localStorage.setItem('access', Re_request_access['result'].data.access);
            
            try{
              const response = await TeacherApiCalls.CurrentAssignmetStateDetails(Current_Assignment_id);

              if(response.status == 200){
                console.log(response.data);
                SetCurrent_AssignmentObj(response.data);
                //get the three list and store to the useState variable using a sigle function that update the three state
              }
            } catch (error){
              console.log(error);
              BackToLogin;
            }
          }
        } catch (error) {
          console.log(error);
          BackToLogin();
        }

      } else if (error.response.status == 404){
        console.log('401 of CurrentAssingmentStateDetails');
        //set teh default for the Current_AssignmentObj
        SetCurrent_AssignmentObj(error.response.data);
      }
    }
  }

  const fetch_Current_SectionDetails = async () => {

    try{

      const response = await TeacherApiCalls.associatedAssignmentsOnCurrentSection(Current_Section);
      
      if(response.status == 200){
        console.log(response.data);
        SetAssignmentOnThisSection(response.data.assignment_assoc);
        Empty_Current_AssignmentObj();
        // SetCurrent_Assignment_id(response.data.assignment_assoc[0].id); //this statement set the initial id of Current_Assigment_id after getting the assignment_assoc, the by default value is object[0].id

        //check first if the response.data.assignment_assoc is not empty, then assign
        //else, set it to 0

      }

    } catch (error) {
      console.log(error.response)
      if (error.response.status == 401){

        try{

          const Re_request_access = ReqAccessTokenSuperScope();

          if (Re_request_access['status_code'] == 401){
            BackToLogin();
          } else if (Re_request_access['status_code' == 200]) {
            localStorage.setItem('access', Re_request_access['result'].data.access);

            try{

              const response = TeacherApiCalls.associatedAssignmentsOnCurrentSection(Current_Section);

              if (response.status == 200) {
                console.log(response.data);
                SetAssignmentOnThisSection(response.data.assignment_assoc);
                SetCurrent_Assignment_id(response.data.assignment_assoc[0].id); //this statement set the initial id of Current_Assigment_id after getting the assignment_assoc, the by default value is object[0].id
              }
            } catch (error) {
              BackToLogin();
            }
          }
        } catch (error) {
          console.log(error);
          BackToLogin()
        }
      }
    }
  }

  
  const routeToTeacherEssayTask = () => {
      
    navigate('/teacheressaytask');

  }

  const toggleStudentList = () => {
    setShowStudentList(!showStudentList);
  };

  const toggleModalSection = () => {
    setShowModalSection(!showModalSection);
  };

  const handleSave = () => {
    if (newSectionName.trim()) {
      // Save the new section (API call or state update can go here)
      console.log('New Section Name:', newSectionName);
      // Hide the modal and reset new section name
      setShowModalSection(false);
      setNewSectionName('');
    }
  };

  const Update_Current_Section = (event) => {

    SetCurrent_Section(event.target.value);

  }

  const Update_Current_Assignment = (assignment_id) => {

    //set the current assignment_id
    SetCurrent_Assignment_id(assignment_id);

  }

  const Empty_Current_AssignmentObj = () => {

    SetCurrent_AssignmentObj({
      
      "message": "",
      "assignment_details": {
        "id": 0,
        "assignment_code": "",
        "assignment_no" : "",
        "section_key": 0,
        "date_created": "",
        "date_due": ""
      },
      "student_total_in_section": "",
      "total_student_submtted": "",
      "submitted_student": ""
    })

  }

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  useEffect(() => {

    TeacherInfo();
    TeacherSection();
    // Current_Section(SectionList[0]['section_code']);
    

  }, []);


  useEffect(() => {

    localStorage.setItem('Current_Section', Current_Section);

    // alert(`Current_Section is updated to ${Current_Section}`);
    //fetch the data of the Current_Section
    fetch_Current_SectionDetails();

  }, [Current_Section]);

  useEffect(() => {

    fetch_Current_AssignmentDetails();


  }, [Current_Assignment_id]);


  return (
    <>
      <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
        <div className='flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
          <div className='w-full flex flex-col sm:flex-row  items-center justify-evenly text-xl pt-4 text-primary dark:text-white text-center'>
          <p>Good Morning Teacher, {Username} !</p>
            <button className='text-primary dark:text-white bg-white dark:bg-primary border mt-2 md:mt-0 lg:mt-0 border-violet-500 rounded-lg p-2 px-4 text-xs'>
                    Class Code : 123456 {Current_Section}
                  </button>
          </div>  
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-evenly text-center pt-4 text-white dark:text-white'>
          
          <div className='flex items-center mb-4 sm:mb-0'>  
            <div className='flex items-center space-x-2'>
            <label className='text-xl text-primary dark:text-white mr-2 hidden sm:block'>Filter:</label>
              <select className='w-auto text-primary dark:text-white bg-blue-500 border border-blue-500 rounded-lg p-2 px-4 text-xs' onChange={Update_Current_Section}>
                {SectionList.map((section_obj, index) => (
                  <option id={index} key={section_obj['section_code']}>{section_obj['section_code']}</option>
                ))}                
              </select>
              <div className='flex items-center ml-2'>
                  <button className='text-primary dark:text-white bg-green-500 border border-green-500 rounded-lg p-2 px-4 text-xs' onClick={toggleModalSection}>
                    add new class +
                  </button>
              </div>
            </div>

          </div>
            
               {/* Add New Class Modal */}
        {showModalSection && (
          <div className="text-primary fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-100 p-6 rounded-lg w-80 text-center">
              <label className="block text-lg font-semibold mb-4">Please Provide Section Name to Create a New Section</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
              />
              <div className="flex justify-around">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={toggleModalSection}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


            

            <div className='flex items-center text-xs'>
              <button className=' text-primary dark:text-white bg-green-500 border border-green-500 border-lg px-4 rounded-lg p-2' onClick={routeToTeacherEssayTask}>
                Create Essay Task 
              </button>
            </div>
        </div>

        <div className='flex flex-col items-center justify-center text-xl  text-primary dark:text-white text-center'>
          <div className='w-4/12 sm:w-6/12 md:w-3/12 lg:w-6/12 flex flex-col sm:flex-row  items-center justify-start text-xl pt-4 text-primary dark:text-white text-center'>
          <p>Recent Task</p>
          </div>  
        </div>

        {/* Recent Task Section */}
        
        <div className='flex flex-col sm:flex-col w-10/12 sm:w-6/12 md:w-6/12 lg:w-6/12  bg-gray-300 rounded-xl p-4  mx-auto mt-2 mb-2 text-center'>
          
          <div className='flex flex-row sm:flex-col justify-center'>
          <div className='flex flex-col xxs:flex-col xs:flex-col md:flex-row lg-flex-row xs:justify-around items-center text-center  mb-2'>
            <span className='font-semibold '>Assignment: Number 1 {Current_AssignmentObj && Current_AssignmentObj.assignment_details.assignment_code}</span>
            <span className='m-1'>Date Created: 11/12/2312{Current_AssignmentObj && Current_AssignmentObj.assignment_details.date_created}</span>
            <span className='m-1'>Due Date: 11/13/2312 {Current_AssignmentObj && Current_AssignmentObj.assignment_details.date_due}</span>
          </div>
          </div>      

          <div className='flex flex-row sm:flex-col justify-center'>
          <div className='flex flex-col xxs:flex-col xs:flex-col md:flex-row lg-flex-row xs:justify-evenly items-center text-center mb-2'>
            <span className='m-1'>Understanding The Self</span>
            <span className='m-1'>Submitted: sample {Current_AssignmentObj && Current_AssignmentObj.submitted_student}</span>
            <button className='m-1 bg-blue-500 text-white rounded-lg px-4 py-2 text-sm' onClick={toggleStudentList}>View Students</button>
          </div>
          </div>

          <div className='flex justify-end'>
            
          </div>
        </div>
        
        
        {/* Student List Section - Conditionally Rendered */}
        {showStudentList && (
          <div className=''>
            <div className='w-11/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-gray-200 rounded-xl p-2 mx-auto'>
                <div className='flex text-center text-primary'>
        
                  {/* Column 1: Student Name */}
                  <div className='flex-1 cursor-pointer'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base'>Student Name</div>
                    {/* use map on this div */}
                    <div>John Doe</div>
                    <div>Jane Smith</div>
                    <div>Mark Johnson</div>
                  </div>

        {/* Vertical Line */}
        <div className='w-px bg-gray-400 mx-4'></div>

                  {/* Column 2: Date Submitted */}
                  <div className='flex-1 cursor-pointer'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base'>Date Submitted</div>
                    <div>11/12/2024</div>
                    <div>11/12/2024</div>
                    <div>11/12/2024</div>
                  </div>

        {/* Vertical Line */}
        <div className='w-px bg-gray-400 mx-4'></div>

                  {/* Column 3: Evaluation */}
                  <div className='flex-1 cursor-pointer'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base'>Evaluation</div>
                    <div>Excellent</div>
                    <div>Good</div>
                    <div>Needs Improvement</div>
                  </div>

                </div>
            </div>
          </div>
        )}


        <div className='flex flex-col items-center mb-4'>
          {/* Small Gray Divs */}
          <div className='flex flex-row items-center justify-center'>
            <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-4 w-full text-primary'>
              {AssignmentOnThisSection.map((assignment_obj, index) => ( 
                // setup and onClick event in this div, when it is clicked it will change the state of the Current_AssignmentObj
                // assign key and id
                <div id={index} key={index} className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl' onClick={() => {Update_Current_Assignment(assignment_obj.id)}}> 
                  <p>{assignment_obj.assignment_no}</p> 
                </div>
              ))}
              
              {/* <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
                <p>100%</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )

}


export default TeacherComponent;