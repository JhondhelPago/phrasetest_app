import React, { useEffect, useState } from 'react'
import styles from '../style'
import { axiosInstance, axiosRefresh } from '../module/axiosInstances';
import { loadTeacherInfo, TeacherApiCalls, ReqAccessToken } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

const TeacherComponent = () => {

  const navigate = useNavigate();

  const [Username, SetUsername] = useState('');

  const [SectionList, SetSectionList] = useState([]);

  const TeacherInfo = async () => {

    try {
        console.log(`teacher access token: ${localStorage.getItem('access')}`);

        // const response = await axiosInstance.get(`teacher/info`, {
        //     params: {
        //         access: localStorage.getItem('access'),
        //     },
        // });

        const response = await TeacherApiCalls.loadTeacherInfo();


        if (response.status === 200){

          console.log(response); // Log the response

          SetUsername(response.data.username);

        }

    } catch (error) {
        
      if (error.response.status === 401){

        console.log('401 control flow');

        // get new access token using the refresh
        try{

          const response = await ReqAccessToken();

          console.log(`new access token : ${response.data.access}`);

          if (response.status ===  200){
            localStorage.setItem('access', response.data.access);

            try{

              const response = await TeacherApiCalls.loadTeacherInfo();
      
              if (response.status === 200){
      
                console.log(response); // Log the response
      
                SetUsername(response.data.username);
      
              }

            } catch(error) {
              console.log(error);
              throw error;
            }

          }

        } catch(error){

          console.log(`axiosRefresh failed`);
          console.log(error);
          
          if (error.response === 401) {
            //refresh_toekn expired need to login to obtain pair token
            navigate('/loginpage');
          }
        }
      }
      //end block of 401 control flow
    }
  } 

  const TeacherSection = async () => {

    try{

      const response = await TeacherApiCalls.associatedSections();

      if (response.status === 200){
        console.log(response.data);
        SetSectionList(response.data.section_list);
      }

    } catch(error) {
      
      if (error.response.status === 401){
        // get new access token using the refresh token

        try{

          const response = await ReqAccessToken();

          if (response.status === 200){

            localStorage.setItem('access', response.data.access);


            try{

              const response = await TeacherApiCalls.associatedSections();

              if (response.status === 200){
                console.log(response.data);
                SetSectionList(response.data);
              }

            } catch (error) {

            }



          }

        } catch(error) {

          console.log(error);
          //refresh token is expired
          navigate('/loginpage');

        }

        console.log('api call denied');
      }

    }

  } 

  const routeToTeacherEssayTask = () => {
      
      navigate('/teacheressaytask');

  }

  useEffect(() => {

    TeacherInfo();
    TeacherSection();

  }, [])


  return (
    <>
    <div className='flex flex-col font-poppins bg-white dark:bg-primary flex-grow-0'>
      <div className='flex items-center justify-center text-xl pt-4 text-primary dark:text-white text-center'>
          Good Morning Teacher {Username && Username}!
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-evenly text-center p-4 text-white dark:text-white'>
      <div className='flex items-center mb-4 sm:mb-0'>
          <label className='text-xl text-primary dark:text-white mr-2 hidden sm:block'>Filter:</label>
          <select className='w-full text-primary dark:text-white bg-blue-500 border border-blue-500 rounded-lg p-2 px-4 text-xs'>
            {SectionList.map((section_dict, index) => (
              <option>{section_dict['section_code']}</option>
            ))}
            {/* <option>Section 1</option>
            <option>Section 2</option>
            <option>Section 3</option> */}
          </select>
        </div>
          <div className='flex items-center text-xs'>
            <button className=' text-primary dark:text-white bg-green-500 border border-green-500 border-lg px-4 rounded-lg p-2' onClick={routeToTeacherEssayTask}>
              Create Essay Task 
            </button>
          </div>
      </div>

      <div className='flex flex-col items-center'>
        {/* Large Gray Div */}
        <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row ss:flex-row items-center justify-between'>
            <div className='w-28 h-28 bg-gray-300 ss:mb-4 sm:mb-4 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-72 md:h-48 lg:w-80 lg:h-48 xl:w-80 xl:h-72 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='flex flex-col items-center justify-center p-4'>
            <label className='text-xl text-primary dark:text-white'>
                sample
            </label>
            <label className='text-xl text-primary dark:text-white'>
                sample
            </label>
            <label className='text-xl text-primary dark:text-white'>
                sample
            </label>
            <label className='text-xl text-primary dark:text-white'>
                sample
            </label>
           
            </div>
        </div>
        {/* Small Gray Divs */}
        <div className='flex flex-row items-center justify-center'>
          <div className='grid grid-cols-2 xs:grid-cols-2 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 items-center gap-4 w-full text-primary'>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
            <div className='w-28 h-28 bg-gray-300 ss:w-40 ss:h-40 sm:w-48 sm:h-48 md:w-64 md:h-48 lg:w-72 lg:h-48 flex items-center justify-center rounded-xl'>
              <p>100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TeacherComponent