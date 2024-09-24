import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../style';
import {} from '../assets';


//function as props to be deconstructed here on the Component
const InputDetails = ({ updateUseStates, handleSubmitForm, handleEssaySubmit, renderInformation, setRenderInformation, renderEssay, setRenderEssay, getInformationState, getEssayState, readyState, handleSubmitForms, isSubmit, timeDisplay }) => {

    const EditFillUpForm = () => {

        setRenderInformation(true);
        setRenderEssay(false);

        //assigning the useState value to the input tag


    }

    const EditEssayForm = () => {
        
        setRenderEssay(true);
        setRenderInformation(false);
        

        //assigning the the useState value to the input tag

    }

    return (
        <>
            {/* dito bandat ang problem */}
            
            <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative z-[1] px-20 py-6  border-t-4  border-blue__gradient border-b-4 border-b-blue__gradient shadow-glow-t rounded-3xl mt-14">
            <div className={`${styles.paddingY} `}>
                {/* flex para ma horizntl display */}
                <div className='flex flex-row justify-center items-center md:flex-row space-x-32 '>
                    {/* <img></img> */}
                    <h1 className="font-poppins text-primary dark:text-white font-semibold text-4xl mb-4 hidden xs:block">Fill Up Form</h1>
                    {!renderInformation && (
                        <button type="submit" className="bg-green-600 text-white font-semibold px-9 py-2 rounded-lg" onClick={() => {EditFillUpForm()}}> Edit </button> 
                    )}
                </div>
                
                {renderInformation === true && (
                    <div className={`max-w-xl xs:w-full mx-auto p-6 rounded-lg shadow-md border border-gray-300`}>
                        {/* <h2 className="text-3xl text-center text-white dark:text-white font-bold mb-6">Fill Up Form</h2> */}
                        <form onSubmit={handleSubmitForm}>
                            <div className="mb-4">
                                <label className="block text-primary dark:text-white text-sm font-semibold mb-2" htmlFor="" >First Name (Optional) </label>
                                <input placeholder="Ex. Juan Dela Cruise" className="w-full px-3 py-2 border rounded-lg bg-white dark:text-primary border-gray-300" type="text" value={getInformationState().name} onChange={(e) => updateUseStates(e, 'name')}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary dark:text-white text-sm font-semibold mb-2" htmlFor="" >Last Name (Optional) </label>
                                <input placeholder="Ex. Juan Dela Cruise" className="w-full px-3 py-2 border rounded-lg bg-white dark:text-primary border-gray-300" type="text" value={getInformationState().lastname} onChange={(e) => updateUseStates(e, 'lastname')}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary dark:text-white text-sm font-semibold mb-2" htmlFor="" >Your Nickname (Optional)</label>
                                <input placeholder="Ex. Tutoy" className="w-full px-3 py-2 border rounded-lg bg-white dark:text-primary border-gray-300" type="text" value={getInformationState().nickname} onChange={(e) => updateUseStates(e, 'nickname')}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-primary dark:text-white text-sm font-semibold mb-2" htmlFor="" >Your Age <span className ="text-red-600">*</span></label>
                                <input placeholder="Ex. 13" className="w-full px-3 py-2 border rounded-lg bg-white dark:text-primary border-gray-300" required type="number" value={getInformationState().age} onChange={(e) => updateUseStates(e, 'age')}/>
                            </div>
                            <div className="mb-4">
                            <label for="gradelevel" class="block mb-2 text-sm font-medium text-primary dark:text-white">Gender <span className ="text-red-600">*</span></label>
                                <select id="gradelevel" class="text-primary bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-primary" value={getInformationState().gender} onChange={(e) => updateUseStates(e, 'gender')}>
                                    <option value={''} disabled selected>select your gender</option>
                                    <option value={1} >Male</option>
                                    <option value={2}>Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                            <label for="gradelevel" class="block mb-2 text-sm font-medium text-primary dark:text-white">Grade Level <span className ="text-red-600">*</span></label>
                                <select id="gradelevel" class="text-primary bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-primary" value={getInformationState().gradeLevel} onChange={(e) => updateUseStates(e, 'gradeLevel')}>
                                    <option value={''} disabled selected>select your grade level</option>
                                    <option value={1}>Grade 1</option>
                                    <option value={2}>Grade 2</option>
                                    <option value={3}>Grade 3</option>
                                    <option value={4}>Grade 4</option>
                                    <option value={5}>Grade 5</option>
                                    <option value={6}>Grade 6</option>
                                </select>
                            </div>
                            <div className="mb-4">
                            <label for="SchoolPicker" class="block mb-2 text-sm font-medium text-primary dark:text-white">School<span className ="text-red-600">*</span></label>
                                <select id="SchoolPicker" class="text-primary bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-primary" value={getInformationState().schoolFrom} onChange={(e) => updateUseStates(e, 'schoolFrom')}>
                                    <option value={''}>select your school name</option>
                                    <option value={'School1'}>School1</option>
                                    <option value={'School2'}>School2</option>
                                    <option value={'School3'}>School3</option>
                                    <option value={'School4'}>School4</option>
                                    <option value={'School5'}>School5</option>
                                    <option value={'School6'}>School6</option>
                                </select>
                            </div>
                            
                            <div>
                                <button type="submit" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">
                                    Save
                                </button>
                            </div> 
                            
                        </form>

                    </div>
            )}
            </div>
            </div>


            <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative z-[1] px-20 py-6  border-t-4  border-blue__gradient border-b-4 border-b-blue__gradient shadow-glow-t rounded-3xl mt-14">
            <div className={`${styles.paddingY}`}>
                <div className='flex flex-row justify-center items-center md:flex-row space-x-32'>
                    {/* <img></img> */}
                    <h1 className="font-poppins text-primary dark:text-white font-semibold text-4xl mb-4">Essay Form</h1>
                    {!renderEssay && (
                        <button type="submit" className="bg-green-600 text-white font-semibold px-9 py-2 rounded-lg" onClick={() => {EditEssayForm()}}> Edit </button> 
                    )}
                </div>
                
                {renderEssay === true && (
                    
                    <div className={`max-w w-full mx-auto p-12 rounded-lg shadow-md border border-gray-300`}>
                        <form onSubmit={handleEssaySubmit} >
                            <div className="mb-10">
                                <label className="block text-primary dark:text-white text-left text-2xl font-semibold mb-2" htmlFor="">{getEssayState().question1}</label>
                                <div className=" flex md:flex md:items-center text-center">
                                    <button type="submit" className="bg-blue-600 text-white  font-semibold text-xs px-4 py-2 mb-2 rounded-lg">
                                    generate new question 
                                    </button>
                                </div>
                                <textarea rows='3' placeholder="Type your answer here..." required className="block p-2.5 w-full  px-3 py-2 border rounded-lg bg-white dark:text-primary"  value={getEssayState().answer1} onChange={(e) => updateUseStates(e, 'answer1')}/>
                            </div>
                                
                            <div className="mb-10">
                                <label className="block text-primary dark:text-white text-left text-2xl font-semibold mb-2" htmlFor="">{getEssayState().question2}</label>
                                <div className=" flex md:flex md:items-center text-center">
                                    <button type="submit" className="bg-blue-600 text-white  font-semibold text-xs px-4 py-2 mb-2 rounded-lg" >
                                    generate new question 
                                    </button>
                                </div>
                                <textarea rows='3' placeholder="Type your answer here..." required className="block p-2.5 w-full  px-3 py-2 border rounded-lg bg-white dark:text-primary" value={getEssayState().answer2} onChange={(e) => updateUseStates(e, 'answer2')}/>
                            </div>
                
                            <div className="mb-10">
                                <label className="block text-primary dark:text-white text-left text-2xl font-semibold mb-2" htmlFor="">{getEssayState().question3}</label>
                                <div className=" flex md:flex md:items-center text-center">
                                    <button type="submit" className="bg-blue-600 text-white  font-semibold text-xs px-4 py-2 mb-2 rounded-lg">
                                    generate new question 
                                    </button>
                                </div>
                                <textarea rows='3' placeholder="Type your answer here..." required className="block p-2.5 w-full  px-3 py-2 border rounded-lg bg-white dark:text-primary" value={getEssayState().answer3} onChange={(e) => updateUseStates(e, 'answer3')}/>
                            </div>
                            <div className=" flex md:flex md:items-center text-center">
                                    <button type="submit" className="bg-green-600 text-primary dark:text-white font-semibold px-4 py-2 rounded-lg" >
                                    Save 
                                    </button>
                            </div>
                        </form>
                    </div>
                )}  
                </div>         
            </div>


            {/* dynamic render of the submit button */}
            {readyState && (
                
                <div className=" flex-col md:flex md:items-center text-center">
                    
                    <button type="submit" className="bg-green-600 text-primary dark:text-white font-semibold px-9 py-3 rounded-lg" onClick={() => {handleSubmitForms()}}>Submit</button>
                </div>
            )}

            {/* here */}
            {isSubmit && (

                <div className=" flex-col md:flex md:items-center text-center mt-20 font-poppins ">
                    <button type="submit" className=" text-primary dark:text-white font-semibold px-9 py-3 rounded-full w-72 h-72 text-8xl border-t-4  border-t-green-500 border-b-4 border-b-gray-800 shadow-glow-t ">
                        {timeDisplay}
                        <p className="text-primary dark:text-white text-xl">please wait...</p>
                    </button>
                </div>

            )}
        </>
    )
}


export default InputDetails