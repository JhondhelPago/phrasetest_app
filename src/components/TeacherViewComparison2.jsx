import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import NormalSpan from './SpanComponent';
import { StudentAPICalls, TeacherApiCalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

import { rubricsScorePercentile, continuousScorePercetile } from '../module/utils';

import ProgressBar from "@ramonak/react-progress-bar";

const TeacherViewComparison2 = () => {

  const [showComment, setShowComment] = useState(false);

  const navigate = useNavigate();

  const [Result, SetResult] = useState(null);

  const [Comment, SetComment] = useState('');

  const [IsPostCommentSuccess, SetIsPostCommentSuccess] = useState(0);


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

  const RouteToHome = () => {
    navigate("/teacherpage");
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
        <div className='relative'>

            <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
            style={{ bottom: '30%', right: '100%', transform: 'translate(-50%, -50%)'}}></div>
            <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
            style={{ bottom: '0%', right: '100%', transform: 'translate(-50%, -50%)'}}></div>

            <div className="absolute w-[590px] h-[400px] bg-indigo-400 rounded-full z-0 blur-[150px]" 
            style={{ top: '60%', left: '40%', transform: 'translate(-50%, -50%)' }}></div>
            <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-[150px]" 
            style={{ top: '60%', left: '60%', transform: 'translate(-50%, -50%)' }}></div>

            <div className="absolute w-[590px] h-[400px] bg-pink-400 rounded-full z-0 blur-3xl" 
            style={{ top: '70%', left: '120%', transform: 'translate(-0%, -50%)' }}></div>
            <div className="absolute w-[590px] h-[400px] bg-blue-400 rounded-full z-0 blur-3xl" 
            style={{ top: '40%', left: '120%', transform: 'translate(-0%, -50%)' }}></div>

            <div className='relative z-10'>

            <div className='relative z-10 flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center font-poppins'>
                <div className='w-full flex flex-col sm:flex-row  items-center justify-around text-xl pt-4 mb-4 text-primary dark:text-white text-center'>
                    <p>Student Name: <span className='font-bold'> Jhon Rogelio Solis</span></p>
                        <button className='text-primary dark:text-white bg-green-500  mt-2  md:mt-0 lg:mt-0  rounded-lg p-2 px-4 text-xs' onClick={toggleComment}>
                            Add Comment
                        </button>
                </div>  
                </div>

                {showComment && (
                <div className='flex flex-col justify-center  font-poppins'>
                    <div className='flex item-center justify-center  font-semibold'>
                    <textarea placeholder="Comment to Student" className="w-10/12 h-full sm:w-10/12 md:w-10/12 lg:w-8/12 pl-2 pt-2 pb-72 sm:pb-60 md:pb-42 lg:pb-24 text-lg border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text" value={Comment} onChange={UpdateCommentState} ></textarea>
                    </div>
                        
                        <div className='w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 flex justify-end text-sm mb-2'>
                            <button type="submit" className="bg-green-600 text-primary dark:text-white px-[40px] py-2 mt-2 rounded-lg items-end" onClick={PostCommentHandler}>
                                Send 
                            </button>
                        </div>
                </div>
                )}



            <div className=" w-full flex flex-col bg-white dark:bg-primary border-2 border-violet-500 rounded-lg mb-4 p-4 font-poppins">
                <div className='flex flex-start text-xl justify-start text-primary dark:text-white'>
                <p>Teacher's comment : {Comment}</p>
                </div>
            </div>
            <h1 className='flex items-center justify-center font-poppins text-dark dark:text-white text-3xl mb-4 text-center font-bold'>CHECK EXAMINED QUESTION ESSAY 1</h1>

            <div className='flex flex-col sm:flex-row  text-center justify-center'>

                
            <div className='w-full'>
            <div className="w-full flex flex-col  bg-violet-400 border-4 border-violet-500 bg-opacity-70 rounded-xl mb-4 p-4 font-poppins">
                
                <div className='flex flex-col text-sm md:text-lg  text-pink-200 font-bold'>

                
                <div className="flex flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className="mb-1">Ideas</span>
                    <ProgressBar completed={continuousScorePercetile(Result && Result.features.topic_relevance_score)} className="w-full  p-2" />
                    </div>
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className="mb-1">Grammar Punctuation</span>
                    <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.gram_punc)} className="w-full p-2" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
                <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className="mb-1">Transitions</span>
                    <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.transition)} className="w-full p-2" />
                </div>
                <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className="mb-1">Clarity</span>
                    <ProgressBar completed={parseInt(Result && Result.features.readability_score)} className="w-full p-2" />
                </div>
                </div>

                </div>

                <div className='flex flex-col text-sm md:text-lg  text-pink-200 font-bold'>

                
                <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className='m-1'>Word Choice</span>
                    <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.word_choice)} className="w-full  p-2" />
                    </div>
                    <div className="flex flex-col items-start w-full sm:w-1/2">
                    <span className='m-1'>Structure</span>
                    <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.structure)} className="w-full p-2" />
                    </div>
                </div>

                {/* <div className="flex flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
                <div className="flex flex-col items-start w-full">
                <span className='m-1'>Language Mechanics</span>
                    <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.lang_mechs)} className="w-full p-2" />
                </div>

                </div> */}

                <div className="flex flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
                <div className="flex flex-col items-start w-full">
                <span className='m-1'>Vocabulary Score</span>
                    <ProgressBar completed={continuousScorePercetile(Result && Result.features.unique_word_ratio)} className="w-full p-2" />
                </div>

                </div>

                </div>
            </div>


                
                </div>
                
            
            <div className="hidden sm:flex w-full sm:w-1/2 items-center justify-center bg-violet-400 bg-opacity-70 border-4 border-violet-500 rounded-xl ml-0 sm:ml-4 mb-4 p-4 font-poppins">
                <div className='flex flex-col text-4xl font-bold justify-start  text-yellow-200'>
                <p className=''>{Result && Result.rubrics.label}</p>
                </div>
            </div>

            </div>


            <div className=" w-full flex flex-col bg-violet-400 border-4 bg-opacity-70  border-violet-500 rounded-xl mb-4 p-4 font-poppins">
          <div className='flex flex-col text-sm md:text-lg justify-start text-pink-200 font-bold'>

          <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
              <div className="flex flex-col items-start w-full sm:w-8/12">
              <span className='m-1'>Words: {Result && Result.features.word_count}</span>
                <ProgressBar completed={parseInt(Result && Result.features.word_count).toString()} className="w-full  p-2" />
              </div>
              <div className="flex flex-col items-center text-nowrap w-full sm:w-3/12">
              <div className="flex flex-col items-center justify-center w-full sm:w-1/3">
              <span className='m-1'>Simple Sentences</span>
              <div className='text-3xl'>
              {Result && Result.features.sentence_simple}
              </div>
                {/* <ProgressBar completed="60" className="w-full p-2" /> */}
              </div>
              </div>
             
          </div>

          <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
              <div className="flex flex-col items-start w-full sm:w-8/12">
              <span className='m-1'>Readability Score</span>
                <ProgressBar completed={parseInt((Result && Result.features.readability_score))} className="w-full  p-2" />
              </div>
              <div className="flex flex-col items-center justify-center text-nowrap w-full sm:w-3/12">
              <div className="flex flex-col items-center justify-center w-1/2 sm:w-1/3">
              <span className='m-1'>Compound Sentence</span>
              <div className='text-3xl'>
              {Result && Result.features.sentence_compound}
              </div>
                {/* <ProgressBar completed="60" className="w-full  p-2" /> */}
              </div>
              </div>
              
          </div>
          

          <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
              <div className="flex flex-col items-start w-full sm:w-8/12">
              <span className='m-1'>Topic Relevance</span>
                <ProgressBar completed={continuousScorePercetile(Result && Result.features.topic_relevance_score)} className="w-full  p-2" />
              </div>

              <div className="flex flex-col items-center text-nowrap w-full sm:w-3/12">
              <div className="flex flex-col items-center justify-center w-full sm:w-1/3">
              <span className='m-1'>Complex Sentence</span>
                {/* <ProgressBar completed="60" className="w-full p-2" /> */}
                <div className='text-3xl'>
                {Result && Result.features.sentence_complex}
                </div>
              </div>
              </div>
              
          </div>

          </div>
        </div>

                <div className="flex sm:hidden w-full items-center justify-center bg-violet-400 bg-opacity-70 border border-violet-500 rounded-lg mt-4 p-4 font-poppins">
                    <div className="flex flex-col text-4xl font-bold justify-start text-yellow-200">
                        <p>{Result && Result.rubrics.label}</p>
                    </div>
                </div>


            <h2 className='flex items-center justify-center  text-center font-poppins text-dark dark:text-white text-2xl font-semibold pt-4'>Question : {Result && Result.question_composition.question}</h2>
            </div> 
            <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-14">
            
            <div className="relative">
                <div>
                <div className="flex flex-row justify-around items-start relative mb-4 text-center xs:text-center md:text-center">
                    <h1 className="text-2xl font-poppins text-dark dark:text-white font-semibold">Composition</h1> {/* Fix margin : DONE */}
                    {/* <h1 className="text-2xl font-poppins text-dark dark:text-white font-semibold">Suggested Result</h1> */}
                </div>
                
                <div className="flex flex-row justify-evenly text-justify relative"> 
                    <p className="text-lg font-poppins text-dark dark:text-white w-10/12">
                    {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={true}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
                    {Result && Result.question_composition.composition}
                    </p>
                    {/* <div className="border-l-2 border-violet-900 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div> */}
                    {/* <p className="text-lg font-poppins text-dark dark:text-white w-5/12"> */}
                    {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={false}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
                    {/* essay composition here {Result && Result.question_composition.composition}
                    </p> */}
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
                    <button type="submit" className="bg-green-600 text-primary dark:text-white font-semibold px-[60px] py-2 rounded-lg" onClick={RouteToHome}>
                    Back to Home
                    </button>
                </div>
                </div>    
            </div>
            </div>
        </div>
    </>
  )
}

export default TeacherViewComparison2;