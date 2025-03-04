import React, { useEffect, useState } from 'react'
import styles from '../style'
import { axiosInstance, axiosRefresh } from '../module/axiosInstances';
import { loadTeacherInfo, TeacherApiCalls, ReqAccessToken, ReqAccessTokenSuperScope, DirectToLogin } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

const   TeacherComponent = () => {

  const navigate = useNavigate();
  const [showStudentList, setShowStudentList] = useState(false);
  const [showModalSection, setShowModalSection] = useState(false); // Modal state
  const [newSectionName, setNewSectionName] = useState(''); // New section name input
  

  const [Username, SetUsername] = useState('');

  const [SectionList, SetSectionList] = useState([]);

  const [Current_Section, SetCurrent_Section] = useState('');
  const [Current_Assignment_id, SetCurrent_Assignment_id] = useState(0);

  const [Current_AssignmentObj, SetCurrent_AssignmentObj] = useState(null);
  const [Names, SetNames] = useState([]);
  const [Dates, SetDates] = useState([]);
  const [Labels, SetLabels] = useState([]);

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
      console.log('catch block in TeacherSection');
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
        SetNames(response.data.submitted_names);
        SetDates(response.data.submitted_dates);
        SetLabels(response.data.submitted_labels);
        //get the three list and store to the useState variable using a sigle function that update the three state
      }


    } catch (error) {
      console.log(error);

      if (error.response.status == 401){
        console.log('catch block of the fetch_current_assingmentDetails');
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
                SetNames(response.data.submitted_names);
                SetDates(response.data.submitted_dates);
                SetLabels(response.data.submitted_labels);
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
      console.log('this is the bug');
      if (error.response.status == 401){
        console.log('executing the 401 scope of the catch block');
        try{

          const Re_request_access = await ReqAccessTokenSuperScope();
          console.log('status_code', Re_request_access['status_code']);
          if (Re_request_access['status_code'] == 401){
            BackToLogin();
          } else if (Re_request_access['status_code'] == 200) {
            localStorage.setItem('access', Re_request_access['result'].data.access);

            try{

              const response = TeacherApiCalls.associatedAssignmentsOnCurrentSection(Current_Section);

              if (response.status == 200) {
                console.log(response.data);
                SetAssignmentOnThisSection(response.data.assignment_assoc);
                Empty_Current_AssignmentObj();
                //SetCurrent_Assignment_id(response.data.assignment_assoc[0].id); //this statement set the initial id of Current_Assigment_id after getting the assignment_assoc, the by default value is object[0].id
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

  const CreateNewSection = async () => {
    
    try{

      if (newSectionName == '') {
        alert('Please enter a section name');
        return;
      }
      
      console.log(`newSectionName current state : ${newSectionName}`);

      const response = await TeacherApiCalls.AddNewSection(newSectionName);

      if (response.status == 200) {
        //recall the function that gets the section list of the teacher
        TeacherSection();
        toggleModalSection();
      }

    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {

        const Re_request_access = await ReqAccessTokenSuperScope();

        if (Re_request_access['status_code'] == 401){
          BackToLogin();
        } else if (Re_request_access['status_code'] == 200){
          localStorage.setItem('access', Re_request_access['result'].data.access);

          try{

            const response = await TeacherApiCalls.AddNewSection(newSectionName);

            if (response.status == 200) {
              //recall the function that gets the section list of the teacher
              TeacherSection();
              toggleModalSection();
            } else {
              //recall the function that gets the section list of the teacher
              TeacherSection();
              toggleModalSection();
            }

          } catch (error) {
            console.log(error);
          }
        }
      } 
    }
  }


  const Update_newSectionNameState = (event) => {
    setNewSectionName(event.target.value);
  }
  
  const Clear_newSectionNameState = () => {
    setNewSectionName('');
  }

  const routeToTeacherEssayTask = () => {
      
    navigate('/teacheressaytask');

  }

  const toggleStudentList = () => {
    setShowStudentList(!showStudentList);
  };

  const toggleModalSection = () => {
    setShowModalSection(!showModalSection);
    Clear_newSectionNameState();
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

    // set the current assingment_id on local storage
    localStorage.setItem('assignment_id', assignment_id);

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

  const DefaultEmptyStates = () => {
    SetNames([]);
    SetDates([]);
    SetLabels([]);
  }

  const BackToLogin = () => {
    navigate('/loginpage');
  }

  const SetLocalSelected_Stud_id = (id) => {
    localStorage.setItem('current_selected_stud_id', id);
    //navigate here to the teacher/examineresults
    navigate('/teacher/examineresults');
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
    DefaultEmptyStates();
    fetch_Current_SectionDetails();

  }, [Current_Section]);

  useEffect(() => {

    fetch_Current_AssignmentDetails();


  }, [Current_Assignment_id]);


  return (
    <>
      <div className='relative'>
      <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
       style={{ bottom: '30%', right: '100%' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
       style={{ top: '60%', left: '40%', transform: 'translate(-50%, -50%)' }}></div>
       <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
       style={{ top: '60%', left: '60%', transform: 'translate(-50%, -50%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
       style={{ top: '80%', left: '100%' }}></div>
      
      
      <div className='relative z-10 flex flex-col font-poppins bg-transparent dark:bg-trasparent flex-grow-0'>
        <div className='relative flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
        
          <div className='w-10/12 flex flex-col sm:flex-row  items-center sm:items-start justify-between text-xl pt-4 text-primary dark:text-white text-center'>
          <p className='text-ellipsis font-extralight'> <span className='font-bold'>Good Morning Teacher,</span>  {Username} !</p>
            <button className='text-primary dark:text-white bg-white dark:bg-primary border mt-2 sm:mt-0 lg:mt-0 border-violet-500 rounded-lg p-2 px-4 text-xs'>
                    <span className='font-bold'>Class Code : </span>{Current_Section}
                  </button>
          </div>  
        </div>
        <div className='w-full flex flex-row sm:flex-col items-center text-center pt-0 sm:pt-2 font-poppins  text-white dark:text-white'>
          
          <div className='w-full flex flex-col sm:flex-row'>

          
          <div className='w-full flex mb-0 sm:mb-0 justify-center sm:justify-end mt-2 sm:mt-0'>  

            
            <div className='flex w-10/12 '>

            
            <div className='w-full flex flex-row items-center justify-start  '>

            
            <div className='flex w-full sm:w-10/12 justify-center sm:justify-start'>
            <label className='text-xl text-primary dark:text-white hidden sm:block pr-2'>Filter:</label>
            
            
            <select className='w-auto text-primary dark:text-white bg-blue-500 border border-blue-500 rounded-lg p-2 px-4 text-xs font-bold' onChange={Update_Current_Section}>
              {SectionList.map((section_obj, index) => (
                <option id={index} key={section_obj['section_code']} value={section_obj.section_code}>{section_obj.section_name}</option>
              ))}                
            </select>
            <div className='flex items-center ml-2'>
                <button className='text-primary dark:text-white bg-green-500 border border-green-500 rounded-lg p-2 px-4 text-xs font-bold' onClick={toggleModalSection}>
                  add new class +
                </button>
            </div>
            </div>
            
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
                onChange={Update_newSectionNameState}
              />
              <div className="flex justify-around">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={toggleModalSection}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={CreateNewSection}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


            
            
            <div className='w-full flex flex-col text-xs   mt-2 sm:mt-0'>
              <div className='flex w-full'>
                <div className='flex flex-row sm:flex-col w-full'>
                  <div className='flex w-full sm:w-10/12 justify-center sm:justify-end'>
                  <button className=' text-primary dark:text-white bg-green-500 border border-green-500 border-lg px-4 rounded-lg p-2 font-bold' onClick={routeToTeacherEssayTask}>
                  Create Essay Task 
                </button>
                  </div>
                
                </div>
              </div>

            </div>
            </div>
        </div>



        <div className='flex flex-col items-center justify-center text-xl  text-primary dark:text-white text-center'>
          <div className='w-10/12 mt-4 flex flex-col sm:flex-row  items-center justify-start text-lg  text-primary dark:text-white text-center'>
          <p>Tasks</p>
          </div>  
        </div>

        {/* Recent Task Section */}
        
        <div className='flex flex-col sm:flex-col w-10/12 text-primary dark:text-white bg-violet-300 bg-opacity-60 dark:bg-blue-300 dark:bg-opacity-60 border border-violet-900 dark:border-blue-900 rounded-xl p-4  mx-auto mt-2 mb-2 text-center'>
          
          <div className='flex flex-row sm:flex-col justify-center text-primary dark:text-white'>
          <div className='flex flex-col xxs:flex-col xs:flex-row md:flex-row lg-flex-row xs:justify-around items-center text-center  mb-2'>
            <span className='font-semibold '>Assignment: Number 1 {Current_AssignmentObj && Current_AssignmentObj.assignment_details.assignment_code}</span>
            <span className='m-1'>Date Created: {Current_AssignmentObj && Current_AssignmentObj.assignment_details.date_created}</span>
            <span className='m-1'>Due Date: {Current_AssignmentObj && Current_AssignmentObj.assignment_details.date_due}</span>
          </div>
          </div>      

          <div className='flex flex-row sm:flex-col justify-center  text-primary dark:text-white'>
          <div className='flex flex-col xxs:flex-col xs:flex-row md:flex-row lg-flex-row xs:justify-evenly items-center text-center mb-2'>
            <span className='m-1'>Understanding The Self</span>
            <span className='m-1'>Submitted: sample {Current_AssignmentObj && Current_AssignmentObj.submitted_student}</span>
            <button className='m-1 bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-bold' onClick={toggleStudentList}>View Students</button>
          </div>
          </div>

          <div className='flex justify-end'>
            
          </div>
        </div>
        
        
        {/* Student List Section - Conditionally Rendered */}
        {showStudentList && (
          <div className='mb-2'>
            <div className='w-10/12 text-primary dark:text-white bg-violet-300 bg-opacity-60 dark:bg-blue-300 dark:bg-opacity-60 border border-violet-900 dark:border-blue-900 rounded-xl p-2 mx-auto'>
                <div className='flex text-center text-primary dark:text-white'>
        
                  {/* Column 1: Student Name */}
                  <div className='flex-1 cursor-pointer'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base p-2'>Student Name</div>
                    {/* use map on this div */}
                    {/* {Current_AssignmentObj && Current_AssignmentObj.submitted_name.map((names) => (
                      <div>John Doe</div>
                    ))} */}

                    {Names.map((names, index) => (
                      // onclick here, and passing the parameter at index 1
                      <div className='pb-2' onClick={() => {SetLocalSelected_Stud_id(names[1])}}>{names[0]}</div>
                    ))}
                    
                  </div>

        {/* Vertical Line */}
        <div className='w-px bg-violet-900 mx-4 hidden sm:block'></div>

                  {/* Column 2: Date Submitted */}
                  <div className='flex-1 cursor-pointer hidden sm:block'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base p-2'>Date Submitted</div>
                    {Dates.map((date, index) => (
                      <div className='pb-2' onClick={() => {SetLocalSelected_Stud_id(date[1])}}>{date[0]  + "  " +date[1]}</div>
                    ))}
                   
                  </div>

        {/* Vertical Line */}
        <div className='w-px bg-violet-900 mx-4'></div>

                  {/* Column 3: Evaluation */}
                  <div className='flex-1 cursor-pointer'>
                    <div className='font-semibold text-xs sm:text-base md:text-sm lg:text-base p-2'>Evaluation</div>
                    {Labels.map((label, index) => (
                      <div className='pb-2' onClick={() => {SetLocalSelected_Stud_id(label[1])}}>{label[0]}</div>
                    ))}
      
                  </div>

                </div>
            </div>
          </div>
        )}


        <div className='flex flex-col items-center mb-4'>
          {/* Small Gray Divs */}
          <div className='w-full flex flex-row items-center justify-center'>
            {/*flex flex-col sm:flex-col w-11/12 sm:w-11/12 md:w-11/12 lg:w-8/12  bg-gray-300 rounded-xl p-4  mx-auto mt-2 mb-2 text-center */}
            <div className='w-10/12 grid grid-cols-2 gap-4 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 items-center pt-4 justify-center text-primary'>
              {AssignmentOnThisSection.map((assignment_obj, index) => ( 
                // setup and onClick event in this div, when it is clicked it will change the state of the Current_AssignmentObj
                // assign key and id
                
                <div className='w-full flex flex-row'>
                <div id={index} key={index} className='w-full h-52 text-primary dark:text-white bg-pink-300 dark:bg-blue-300 bg-opacity-60 dark:bg-opacity-60 border border-blue-900 flex items-center justify-center rounded-3xl font-semibold transition-transform duration-300 hover:scale-105 hover:animate-borderLoading' onClick={() => {Update_Current_Assignment(assignment_obj.id)}}> 
                  <p>{assignment_obj.assignment_no}</p> 
                  
                </div>
                </div>
                
              ))}
              
              {/* <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-62 lg:h-52 flex items-center justify-center rounded-xl'>
                <p>100%</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )

}


export default TeacherComponent;