import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";
import { arrowUp } from "../assets";

const GetStarted = () => {

  const navigate = useNavigate();

  const routeToLogin = () => {
    navigate('/loginpage');
  }
  
  return (
    <div className={`${styles.flexCenter} w-[256px] h-[100px] rounded-lg bg-blue-gradient p-[2px] cursor-pointer`} onClick={routeToLogin}>
      <div className={`${styles.flexCenter} flex-col bg-white dark:bg-primary w-[100%] h-[100%] rounded-lg`}>
      <div className={`${styles.flexStart} flex-row item-center `}>
        <p className="font-poppins font-medium text-[18px] leading-[23px]  text-gradient mr-1">
          Get Started 
          </p>
    
          <img src={arrowUp} alt="arrow" className="w-[23px] h-[23px] object-contain ml-2 dark:bg-primary" />
          
      </div>
      </div>
      
    </div>
  )

}

export default GetStarted
