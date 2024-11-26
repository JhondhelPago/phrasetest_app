import React , { useState }from 'react';
import styles from '../style';
import { StudentAPICalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';
import Input from 'postcss/lib/input';
import { AlertModal, LoadingModal } from '../modal';

const Class = () => {

  const navigate = useNavigate();
  const [IsAlertModalShow, SetIsAlertModalShow] = useState(false);
  const [ModalMessage, SetModalMessage] = useState('');
  const [IsLoadingModalShow, SetIsLoadingModalShow] = useState(false);

  const [InputSecCode, SetInputSecCode] = useState('');


  const UpdateInputSecCodeState = (event) => {

    SetInputSecCode(event.target.value);


  }

  const SubmiSectionCode = async () => {

    //check first if the InputSecCode is an empty string, then show Alertmodal

    if (InputSecCode == ''){
      SetModalMessage('Please enter your section code.');
      SetIsAlertModalShow(true);
      return;
    }

    SetIsLoadingModalShow(true);

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
            localStorage.setItem('access', Re_req_access['result'].data.access);

            try{
              
              const response = await StudentAPICalls.JoinClass(InputSecCode);

              if (response.status = 200){
                RouteToStudentPage();
              }

            } catch (error) {

              if (error.response.status == 400) {
                setTimeout(() => {
                  SetIsLoadingModalShow(false);
                }, 3000)

                SetModalMessage('Invalid class code.');
                SetIsAlertModalShow(true);
              } else {
                console.log(error);
              }
            }
          }
        } catch (error) {
          console.log(error);
          BackToLogin();
        }
      } else if (error.response.status == 400) {
        setTimeout(() => {
          SetIsLoadingModalShow(false);
        }, 3000)

        SetModalMessage('Invalid class code.');
        SetIsAlertModalShow(true);
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
        <div className='relative'>

        <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
      style={{ top: '30%', right: '100%', transform: 'translate(-0%, -10%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '30%', left: '40%', transform: 'translate(-50%, -0%)' }}></div>
      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
      style={{ top: '30%', left: '60%', transform: 'translate(-50%, -0%)' }}></div>

      <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
      style={{ top: '30%', left: '100%', transform: 'translate(-0%, -20%)' }}></div>



        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10 text-primary dark:text-white font-poppins">
        
        <h2 className="text-3xl font-semibold mb-6">Please Enter the Class Code</h2>

        </div>
        
        <div className='relative z-10 flex flex-col w-full font-poppins text-primary dark:text-white p-44'>

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

        {IsAlertModalShow && (
          <AlertModal message={ModalMessage} alter_boolean_state={SetIsAlertModalShow}></AlertModal>
        )}

        {IsLoadingModalShow && (
          <LoadingModal></LoadingModal>
        )}

        </div>
        </div>

    </>
    
  );
};

export default Class;
