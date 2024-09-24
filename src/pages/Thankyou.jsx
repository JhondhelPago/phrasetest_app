import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {

    const navigate = useNavigate();
    const [timeDelay, setTimeDelay] = useState(5);

    const timedecrease = (time) => {
        if (time > 0){
            setTimeout(() => {
                setTimeDelay(time - 1);
                timedecrease(time - 1);
            }, 1000)
        } else{
            navigate('/');
        }
    }

    useEffect(() => {

        timedecrease(timeDelay);

    }, []);


    return (
        <div className= "w-screen h-screen flex items-center justify-center bg-primary text-white dark:text-primary dark:bg-white">
            <h1 className="text-xl font-semibold">Thank you for answering our survey. The page will redirect in {timeDelay} {timeDelay > 1 ? 'seconds' : 'second'}</h1><br></br>
            <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] overflow-hidden rounded-full blue__gradient"/>
            <div className="absolute z-[0] w-[30%] h-[30%] -left-[50%] overflow-hidden rounded-full white__gradient"/>
            <div className="absolute z-[0] w-[10%] h-[10%] -left-[50%] overflow-hidden rounded-full white__gradient"/>
        </div>
    )
}

export default ThankYou;