import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import NormalSpan from './SpanComponent';
import SuggestSpan from './SuggestedSpan';
import { StudentAPICalls, TeacherApiCalls, ReqAccessTokenSuperScope } from '../module/APIcalls';
import { useNavigate } from 'react-router-dom';

import { rubricsScorePercentile, continuousScorePercetile } from '../module/utils';

{/*import ProgressBar from "@ramonak/react-progress-bar";*/}

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
                    <p>Student Name: <span className='font-bold'>{Result && Result.student_name}</span></p>
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



            <div className=" w-full flex flex-col bg-white dark:bg-white border-2 border-violet-500 rounded-lg mb-4 p-4 font-poppins">
                    <div className='flex flex-start text-xl justify-start text-primary dark:text-primary'>
                      <p> Teacher's comment :  {Result && Result.question_composition.comment}</p>
                    </div>
            </div>
            <h1 className='flex items-center justify-center font-poppins text-dark dark:text-white text-3xl mb-4 text-center font-semibold'>Examined Result</h1>

            <div className='flex flex-col sm:flex-row  text-center justify-center'>

                
            <div className='w-full'>
      <div className="w-full flex flex-col  bg-transparent dark:bg-white border-4 border-violet-500 bg-opacity-70 rounded-xl mb-4 p-4 font-poppins">
        
        <div className='flex flex-col text-sm md:text-lg  text-blue-500 font-medium'>

          
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Lexical Density</span>
            <p>{Result && Result.difficulty_assessment.lexical_density}</p>
          </div>
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Readability Ease</span>
            <p>{Result && Result.difficulty_assessment.readability_ease}</p>
          </div>
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Context Relevance</span>
            <p>{Result && Result.difficulty_assessment.topic_relevance}</p>
          </div>
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Vocabulary Score</span>
            <p>{Result && Result.features.unique_word_ratio}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Word Count</span>
            <p>{Result && Result.features.word_count}</p>
          </div>
          <div className="flex flex-col items-start">
            <span className="mb-1 text-primary">Noun</span>
            <p>{Result && Result.features.noun_count}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Adjective</span>
            <p>{Result && Result.features.adj_count}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Adverb</span>
            <p>{Result && Result.features.adv_count}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Pronoun</span>
            <p>{Result && Result.features.pronoun_count}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Verb</span>
            <p>{Result && Result.features.verb_count}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Subordinating Clauses</span>
            <p>{Result && Result.features.subordinating_clauses_count}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Cohesive Devices</span>
            <p>{Result && Result.features.cohesive_device_count}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Readability Score</span>
            <p>{Result && Result.features.readability_score}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Simple Sentence</span>
            <p>{Result && Result.features.sentence_simple}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Compound Sentence</span>
            <p>{Result && Result.features.sentence_compound}</p>
          </div>
          <div className="flex flex-col items-start text-start">
            <span className="mb-1 text-primary">Complex Sentence</span>
            <p>{Result && Result.features.sentence_complex}</p>
          </div>
        </div>


        </div>
        
        

        <div className='flex flex-col text-sm md:text-lg  text-orange-500 font-medium'>

          
        <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
            <div className="flex flex-col items-start w-full sm:w-1/2">
            <span className='m-1 text-primary'>Difficulty and Improvement Area</span>
              
              {Result && Result.difficulty_assessment.difficulty_summary.map((object, index) => (
                <>
                  <p class='ml-2'>{index+1}. {object[0]}</p>
                </>
              ))}

            </div>
            <div className="flex flex-col items-start w-full sm:w-1/2">
           
             
            </div>
         </div>

        {/* <div className="flex flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
          <div className="flex flex-col items-start w-full">
          <span className='m-1'>Language Mechanics</span>
            <ProgressBar completed={rubricsScorePercentile(Result && Result.rubrics.lang_mechs)} className="w-full p-2" />
          </div>
  
        </div> */}

        {/* <div className="flex flex-row justify-start sm:justify-around items-start sm:items-start text-center mb-2">
          <div className="flex flex-col items-start w-full">
          
          </div>
  
        </div> */}

        </div>
      </div>


                
        </div>
                
            
           

          </div>

          <h1 className='flex items-center justify-start font-poppins text-dark dark:text-white text-3xl mb-4 text-center font-semibold p-4'>Vocabulary Recommendation</h1>


          <div className='w-full'>

          
        <div className='flex flex-col lg:flex-row  text-center justify-center'>
        <div className=" w-full lg:w-8/12 flex flex-col bg-white border-4 text-center border-violet-500 rounded-xl mb-4 p-4 font-poppins mr-4 text-nowrap">
          <div className='flex flex-col text-sm md:text-lg justify-start text-green-700 font-medium'>

          

          {Result && Result.vocab_recom.map((VocabRecomObj, index) => (

              <div className="flex flex-col">

              <div className="flex  flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-start text-center p-2">
                <div className="flex flex-col items-start w-full sm:w-4/12">
                  <span className='m-1 break-words text-left text-primary text-wrap'>{index+1}. "{VocabRecomObj.word}"</span>
                  
                </div>

                <div className="flex flex-col items-start text-wrap w-full">

                  <span className='flex m-1 break-words text-left'>{index+1}. {VocabRecomObj.suggestion.join(", ")}</span>

                  {/* <ProgressBar completed="60" className="w-full p-2" /> */}

                </div>
              </div>


              </div>

          ))}


          </div>
        </div>


        

        <div className='w-full lg:w-4/12'>

        <div className='w-full'>

        <div className="w-full flex flex-row md:flex-col bg-white border-4 text-start border-violet-500 rounded-xl mb-4 p-4 font-poppins">
                 
                
        <div className='w-full'>
                    
                <div className='w-full flex flex-col text-sm md:text-lg justify-start text-orange-700 font-bold'>
                <div className="mt-4">
            <span className='text-lg text-primary'>Common Terms: </span>
            <span className='ml-2 text-blue-500'>{Result && Result.difficulty_assessment.depth_words.common_term.map((word) => (
              <>
                {word + ', '}
              </>
            ))}</span>  
          </div> 

          <div className="mt-4">
            <span className='text-lg text-primary'>Generalized term: </span>
            <span className='ml-2 text-blue-500'>{Result && Result.difficulty_assessment.depth_words.generalized_term.map((word) => (
              <>
                {word + ', '}
              </>
            ))}</span>  
          </div>

          <div className="mt-4">
            <span className='text-lg text-primary'>Specialized Terms: </span>
            <span className='ml-2 text-blue-500'>{Result && Result.difficulty_assessment.depth_words.specialized_term.map((word) => (
              <>
                {word + ', '}
              </>
            ))}</span>  
          </div>

          <div className="mt-4">
            <span className='text-lg text-primary'>Specific Terms: </span>
            <span className='ml-2 text-blue-500'>{Result && Result.difficulty_assessment.depth_words.specific_term.map((word) => (
              <>
                {word + ', '}
              </>
            ))}</span>  
          </div> 
                </div>
                </div>

                
            </div>
            <div className='w-full'>
                <div className="hidden lg:block w-full flex-col bg-white border-4 text-center border-violet-500 rounded-xl mb-4 p-4 font-poppins">
                
                  <div className='flex flex-col text-4xl font-bold justify-center text-primary p-24'> {/* HEREEEEEEEEEEEEEEEEEEEE CHANGE COLOR WHEN RUBRICS IS ASSIGNED */}
                    <p className='flex items-center justify-center '>{Result && Result.rubrics.label}</p>
                  </div>
            
                </div>
            </div>
            
            </div>
            </div>
            
            

        </div>
        </div>

                <div className="flex lg:hidden w-full items-center justify-center bg-white  border-4 border-violet-500 rounded-lg mt-4 p-16 font-poppins ">
                    <div className="flex flex-col text-4xl font-bold justify-start text-primary">
                        <p>{Result && Result.rubrics.label}</p>
                    </div>
                </div>


            <h2 className='flex items-center justify-center  text-center font-poppins text-dark dark:text-white text-2xl font-semibold pt-4'>Question : {Result && Result.question_composition.question}</h2>
            </div> 
            <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-14">
            
            <div className="relative">
              <div>
              <div className="flex flex-row justify-around items-start  relative mb-4 text-center xs:text-center md:text-center">
                  <h1 className="text-2xl font-poppins text-blue-500 font-semibold">Composition</h1> {/* Fix margin : DONE */}
                  <h1 className="text-2xl font-poppins text-green-700 font-semibold hidden sm:block">Suggested Result</h1>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-evenly text-justify items-center relative"> 
                  <p className="text-xl font-medium font-poppins text-dark dark:text-white w-10/12 p-6">
                    {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={true}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
                    {Result && Result.question_composition.composition}
                  </p>
                  <div className="border-l-2 border-violet-900 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 hidden sm:block"></div>

                  <div className="flex flex-row justify-around items-start relative mb-4 text-center xs:text-center md:text-center">
                  <h1 className="text-2xl font-poppins text-dark dark:text-white font-semibold block sm:hidden">Suggested Result</h1>
                </div>
          
                  <p className="text-xl font-medium font-poppins text-dark dark:text-white w-10/12 p-6"> 
                  {/* {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={false}></NormalSpan>) : (<span>Loading Please Wait..</span>)} */}
                    <SuggestSpan Composition={Result && Result.question_composition.composition} langtool_suggestion={Result && Result.langtool_suggestion}></SuggestSpan>
                  </p> 
                </div>
              
              
                
                {Result && Result.langtool_suggestion.map((langtool_obj) => (
                  langtool_obj.messages[0] != ''  && (<>
                    <div className=" h-full flex flex-row sm:flex-row justify-evenly items-center text-start sm:text-start bg-transparent dark:bg-white border-2 border-primary rounded-lg font-poppins mb-10">
                      <div className={` ${styles.paddingY} w-full px-6`}>
                          <div className="flex flex-row justify-start text-lg text-dark mb-4">

                            {/* Dito boi pa fix lang */}
                            {/* comment sana mag run  */}
                            
                            <div className="text-lg mr-6"> <span className='text-primary font-medium'> Your Sentence:</span> </div> 
                          

                            {/* 1. Improvements message*/}
                            {/* 2. Improvements message*/}
                            {/* 3. Improvements message*/}
                            {/* 4. Improvements message*/}
                            {/* 5. Improvements message*/}

                          </div>
                          <div className='flex flex-row justify-start items-start text-lg text-primary mb-4'>
                            <div className="text-lg text-red-700 ">"{langtool_obj.sentence_orig}"</div> {/* Align this to Error type: Verb Tense */}
                          </div>
                          
                          <div className='flex flex-row justify-start items-start text-lg text-primary'>
                            <div className="text-lg font-medium mb-4 text-primary">Understanding Improvements</div> {/* Align this to Error type: Verb Tense */}
                          </div>
                          <div className='flex flex-col justify-start items-start text-lg text-blue-500'>

                            {langtool_obj.messages.map((message, index) => (
                              <>
                                <ul className="text-lg mb-4">{index+1}. {message}</ul>
                              </>
                            ))}

                            {/* <ul className="text-lg mb-4">1. message here</ul>
                            <ul className="text-lg mb-4">2. </ul> 
                            <ul className="text-lg mb-4">3. </ul>
                            <ul className="text-lg mb-4">4. </ul>
                            <ul className="text-lg mb-4">5. </ul> */}

                          </div>

                          <div className='flex flex-row justify-start items-center text-lg text-primary '>
                            <div className="text-lg mr-4"> <span className='text-primary font-medium'> Corrected Sentence</span></div> {/* Align this to Error type: Verb Tense */}
                          </div>

                          <div className='flex flex-row justify-start items-center text-lg text-primary mt-2'>
                            <div className="text-lg text-green-700">"{langtool_obj.sentence_modif}"</div> {/* Align this to Error type: Verb Tense */}
                          </div>
                          
                      </div>
                    </div>
                  </>)
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