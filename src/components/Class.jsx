import React , { useState }from 'react';
import styles from '../style';
import { StudentAPICalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

const Class = () => {

  const navigate = useNavigate();

  const [InputSecCode, SetInputSecCode] = useState('');


  const UpdateInputSecCodeState = (event) => {

    SetInputSecCode(event.target.value);

  }

  const SubmiSectionCode = async () => {

    try{

      const access_token = localStorage.getItem('access');
      console.log(InputSecCode);

      const response = await StudentAPICalls.JoinClass(InputSecCode);
      console.log(response.data);

      if (response.status == 200){
        RouteToStudentPage();
      }

    }catch(error){
      console.log(error);

      if (error.response.status == 401) {

        try{

          const Re_req_access = await ReqAccessTokenSuperScope();
          
          if (Re_req_access['status_code'] == 200){
            localStorage.setItem('access', Re_req_access['access_token']);

            try{

              const response = await StudentAPICalls.JoinClass(InputSecCode);

              if (response.status = 200){
                RouteToStudentPage();
              }

            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
          BackToLogin();
        }
      }
    }
  }

  const RouteToStudentPage = () => {
    navigate('/studentpage');
  }

  const BackToLogin = () => {
    navigate('/loginpage');
  }


  return (
    
    <>
        <div className="flex flex-col items-center justify-center text-center mt-10 text-primary dark:text-white font-poppins">
        
        <h2 className="text-3xl font-semibold mb-6">Please Enter the Class Code</h2>

        </div>
        
        <div className='flex flex-col w-full font-poppins text-primary dark:text-white p-44'>

        <div className='flex text-center justify-center'>
            <label htmlFor="text" className='text-3xl font-semibold whitespace-nowrap'>Enter Class Code</label>
          </div>

        <div className='flex flex-col sm:flex-row md:flex-row justify-center items-center text-center'>

          

          <div className='text-primary m-4'>
            <input type="text" className='py-4 rounded-md p-2 texl-2xl text-center border-2  border-gray-500 ' onChange={UpdateInputSecCodeState}/>
          </div>
          
          <div className='text-center'>
            <button className='bg-green-500 px-6 py-4 rounded-lg ' onClick={SubmiSectionCode}>
              Submit
            </button>
          </div>

        </div>    

        </div>
      

    </>
    
  );
};

export default Class;
