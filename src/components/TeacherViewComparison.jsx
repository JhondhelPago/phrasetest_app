import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import NormalSpan from './SpanComponent';
import { StudentAPICalls, TeacherApiCalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

const TeacherViewComparison = () => {

  const [showComment, setShowComment] = useState(false);

  const navigate = useNavigate();

  const [Result, SetResult] = useState(null);

  const [Comment, SetComment] = useState('');

  const [IsPostCommentSuccess, SetIsPostCommentSuccess] = useState(0);

  // const fetchResult = async () => {
  //   //parameter needed to run this function 
  //   //student id 
  //   //assignment id

  //   try{

  //     console.log(`fetchResult function is executng on the initial render useEffect`);
  //     console.log(`assignment_id: ${localStorage.getItem('assignment_id')}`);

  //     const response = await StudentAPICalls.GetExamineResults(localStorage.getItem('assignment_id'));

  //     if (response.status == 200){
  //       console.log(response.data);
  //       SetResult(response.data);
  //     } else {
  //       console.log(`status_code: ${response.status}`);
  //       SetResult(response.data);
  //     }
  //   } catch (error) {

  //     if (error.response.status == 401){
  //       try{
  //         const Re_request_access = await ReqAccessTokenSuperScope();

  //          if (Re_request_access['status_code'] == 401){
  //           BackToLogin();
  //          } else if (Re_request_access['status_code'] == 200){
  //           localStorage.setItem('access', Re_request_access['result'].data.access);

  //           try{

  //             const response = await StudentAPICalls.GetExamineResults(localStorage.getItem('assignment_id'));

  //             if (response.status == 200){
  //               console.log(response.data);
  //               SetResult(response.data);
  //             } else {
  //               console.log(`status_code: ${response.data}`);
  //               SetResult(response.data);
  //             }
  //           } catch (error) {
  //             console.log(error);
  //           }
  //          } else {
  //           console.log(`Re_request_access status_code: ${Re_request_access['status_code']}`);
  //          }
  //       } catch (error) {
  //         BackToLogin();
  //       }
  //     }
  //   }
  // }


  const fetchResult = async () => {
    //parameter needed to run this function 
    //student id 
    //assignment id

    try{

      const response = await TeacherApiCalls.ViewStudentExamineResult(localStorage.getItem('current_selected_stud_id'), localStorage.getItem('assignment_id'));

      if (response.status == 200){
        console.log(response.data);
        SetResult(response.data);
        SetComment(response.data.question_composition.comment)
      }

    } catch (error) {
      console.log(error);

      if (error.response.status == 401){

        try{

          const Re_request_access = await ReqAccessTokenSuperScope();

          if (Re_request_access['status_code'] == 401){
            BackToLogin();
          } else if (Re_request_access['status_code'] == 200){

            localStorage.setItem('access', Re_request_access['result'].data.access);

            try{
              
              const response = await TeacherApiCalls.ViewStudentExamineResult(localStorage.getItem('current_selected-stud_id', localStorage.getItem('assignment_id')));

              if (response.status == 200) {
                console.log(response.data);
                SetResult(response.data);
                SetComment(response.data.question_composition.comment)
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error){
          console.log(error);
        }
      }
    }
  }

  const PostCommentHandler = async () => {

    if (Comment == ''){
      alert('Can not submit empty comment');
      return;
    }

    console.log(Comment);
    
    try{

      const response = await TeacherApiCalls.AddComment(localStorage.getItem('current_selected_stud_id'), localStorage.getItem('assignment_id'), Comment);

      if (response.status == 200){
        alert('Comment submitted successfully');
        SetIsPostCommentSuccess(prevVal => prevVal + 1);
      }

    } catch (error){
      console.log(error);
      if (error.response.status == 401) {
        
        try{
          const Re_request_access = await ReqAccessTokenSuperScope();

          if (Re_request_access['status'] == 401) {
            BackToLogin();
          } else if (Re_request_access['status'] == 200) {
            localStorage.setItem('access', Re_request_access['result'].data.access);

            try{

              const response = await TeacherApiCalls.AddComment(localStorage.getItem('current_selected_stud_id'), localStorage.getItem('assignment_id'), Comment);

              if (response.status == 200){
                alert('Comment submitted successfully');
                SetIsPostCommentSuccess(prevVal => prevVal + 1);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error){
          console.log(error);
        }
      }
    }
  }

  const UpdateCommentState = (event) => {
    SetComment(event.target.value);
  }

  const BackToLogin = () => {
    navigate("/loginpage");
  }

  const toggleComment = () => {
    setShowComment(!showComment);
  };
  
  const IsCommentNotEmpty = () => {

    if (Result){
      if(Result.question_composition.comment != ''){
        return true;
      }
    }

    return false;

  }

  //initial render side effect
  useEffect(() => {
  
    fetchResult();

  }, [])


  useEffect(() => {

    fetchResult();
    setShowComment(false);

  }, [IsPostCommentSuccess])


  return (
    <>

    <div className='flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center font-poppins'>
          <div className='w-full flex flex-col sm:flex-row  items-center justify-around text-xl pt-4 mb-4 text-primary dark:text-white text-center'>
            <p>Student Name: <span className='font-bold'>{Result && Result.student_name}</span></p>
                <button className='text-primary dark:text-white bg-green-500  mt-2  md:mt-0 lg:mt-0  rounded-lg p-2 px-4 text-xs' onClick={toggleComment}>
                    Add Comment
                </button>
          </div>  
        </div>

        {showComment && (
        <div className='flex flex-col justify-center  font-poppins'>
            <div className='flex item-center justify-center  font-semibold'>
            <textarea placeholder="Comment to Student" className="w-10/12 lg:w-8/12 pl-2 pt-2 pb-60 sm:pb-60 md:pb-42 lg:pb-24 text-sm border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text" value={Comment} onChange={UpdateCommentState}></textarea>
            </div>
                
                <div className='w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 flex justify-end text-sm mb-2'>
                    <button type="submit" className="bg-green-600 text-primary dark:text-white px-[40px] py-2 mt-3 rounded-lg items-end" onClick={PostCommentHandler}>
                        Send 
                    </button>
                </div>
        </div>
        )}



    <div className=" w-full flex flex-col bg-white dark:bg-primary border border-violet-500 rounded-lg mb-4 p-4 font-poppins">

    {IsCommentNotEmpty() && (
      <div className=" w-full flex flex-col bg-white dark:bg-primary border border-violet-500 rounded-lg mb-4 p-4 font-poppins">
        <div className='flex flex-start text-xl justify-start text-primary dark:text-white'>
          <p>Teacher comment: {Result.question_composition.comment}</p> 
          {/* instead of p tag textarea for the input of comment */}
        </div>
    </div>
    // button here to add comment
    )}

    
      <h1 className='flex items-center justify-center font-poppins text-dark dark:text-white text-3xl mb-4 text-center font-bold'>CHECK EXAMINED QUESTION ESSAY 1 Comparison2 re import</h1>

      <div className='flex flex-col sm:flex-row  text-center justify-center'>

        
      <div className='w-full'>
      <div className=" w-full flex flex-col  bg-violet-400 border border-violet-500 rounded-lg mb-4 p-4 font-poppins">
        <div className='flex flex-col text-sm  text-pink-200'>
          <div className='flex flex-col sm:flex-row  justify-start sm:justify-around items-center sm:items-start text-center  mb-2'>
            <span className='m-1'>Ideas: {Result && Result.rubrics.ideas}</span>
            <span className='m-1'>Grammar Punctuation: {Result && Result.rubrics.gram_punc}</span>
            <span className='m-1'>Transitions: {Result && Result.rubrics.transition}</span>
            <span className='m-1'>Clarity: {Result && Result.rubrics.clarity}</span>
            
          </div>
        </div>
        <div className='flex flex-col text-xl text-pink-200'>
          <div className='flex flex-col sm:flex-row  justify-around xs:justify-evenly items-center text-center  mb-2'>
          <span className='m-1'>Word Choice: {Result && Result.rubrics.word_choice}</span>
          <span className='m-1'>Structure: {Result && Result.rubrics.structure}</span>
          <span className='m-1'>Language Mechanics: {Result && Result.rubrics.lang_mechs}</span>
          </div>
        </div>
      </div>


        <div className=" w-full flex flex-col bg-violet-400 border border-violet-500 rounded-lg mb-4 p-4 font-poppins">
        <div className='flex flex-col text-xl justify-start text-pink-200'>
          <div className='flex flex-col sm:flex-row justify-around xs:justify-evenly items-center text-center  mb-2'>
          <span className='m-1'>Words: {Result && Result.features.word_count}</span>
          <span className='m-1'>Lexical Density: {Result && Result.features.unique_word_ratio}</span>
          <span className='m-1'>Readability Score: {Result && Result.features.readability_score}</span>
          </div>
        </div>


        <div className='flex flex-col text-xl justify-start text-pink-200'>
          <div className='flex flex-col sm:flex-row  justify-around xs:justify-evenly items-center text-center  mb-2'>
          <span className='m-1'>Simple Sentences: {Result && Result.features.sentence_simple}</span>
          <span className='m-1'>Compound Sentence: {Result && Result.features.sentence_compound}</span>
          <span className='m-1'>Complex Sentence: {Result && Result.features.sentence_complex}</span>
          </div>
        </div>
        </div>
        </div>
        

      

      


      <div className="w- sm:w-1/2 flex items-center justify-center bg-violet-400 border border-violet-500 rounded-lg ml-0 sm:ml-4 mb-4 p-4 font-poppins">
        <div className='flex flex-col text-4xl font-bold justify-start  text-yellow-200'>
          <p className=''>{Result && Result.rubrics.label}</p>
        </div>
      </div>

      </div>

      
      
    </div> 


    <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-6">
      
    <div className='flex text-sm item-center justify-center m-4'>
      <h2 className='flex items-center justify-center  text-center font-poppins text-dark dark:text-white text-lg font-semibold p-2'>Question: {Result && Result.question_composition.question}</h2>
      </div>

      <div className="relative">
        <div>
          <div className="flex flex-row justify-around items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-lg font-poppins text-dark dark:text-white font-semibold">Original Composition</h1> {/* Fix margin : DONE */}
            <h1 className="text-lg font-poppins text-dark dark:text-white font-semibold">Suggested Result</h1>
          </div>
          
          <div className="flex flex-row justify-evenly text-justify relative"> 
            <p className="text-lg font-poppins text-dark dark:text-white w-5/12">
              {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={true}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
              {Result && Result.question_composition.composition}
            </p>
            <div className="border-l-2 border-gray-500 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div> {/* Vertical Line */}
            <p className="text-lg font-poppins text-dark dark:text-white w-5/12">
            {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={false}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
            {Result && Result.question_composition.composition}
            </p>
          </div>
          <div className="flex flex-row justify-evenly items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-3xl font-poppins text-green-500 mt-14 font-semibold">Analysis</h1>
          </div>
        
          {Result && Result.langtool_suggestion.map((match_obj, index) => (
          <>
           <div className=" h-full flex flex-row sm:flex-row justify-evenly items-center text-center sm:text-start bg-violet-300 rounded-lg font-poppins mb-10">
            <div className={` ${styles.paddingY} w-full px-6`}>
                <div className="flex flex-row justify-start text-lg text-dark mb-4">
                  <div className="text-lg mr-6"> <span className='text-green-600'> Phrase Correction sentence number : </span> {match_obj.sentence_index+1}</div>
                  <div className="text-lg"> <span className='text-green-600'>Hint : </span>{match_obj.message}</div>
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-primary mb-4'>
                  <div className="text-lg mr-4 mb-4">On sentence : {match_obj.sentence}</div> {/* Align this to Error type: Verb Tense */}
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-primary mb-4'>
                  <div className="text-lg mr-4"> <span className='text-green-600'>Replacement :</span> {match_obj.replacements}</div> {/* Align this to Error type: Verb Tense */}
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-primary mb-4'>
                  <div className="text-lg mr-4"> <span className='text-green-600'>Suggestion Fix :</span> {match_obj.final_sentence}</div> {/* Align this to Error type: Verb Tense */}
                </div>
            </div>
          </div>
          </>      
          ))}

          

          <div className=" flex md:flex md:items-center text-center justify-center mt-6">
            <button type="submit" className="bg-green-600 text-primary dark:text-white font-semibold px-[60px] py-2 rounded-lg" >
            Recompose 
            </button>
          </div>
        </div>    
      </div>
    </div>
    </>
  )
}

export default TeacherViewComparison;