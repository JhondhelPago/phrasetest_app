import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import NormalSpan from './SpanComponent';

const Comment = () => {

const [showComment, setShowComment] = useState(false);

  const [result, setResult] = useState(null)

  //const originalEssayString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.'

  const question1 = 'What is your biggest fear?'

  

  //const originalEssayString = 'Education plays a crucial role in the developement of individuals and societies. It is a tool that equips people with knowledge, skills, and values that are essential for personal and professional growth. In today’s rapidly changing world, having a good education is more important than ever. Firstly, education helps people to think critically. It teaches students how to analyse information, make informed decisions, and solve problems effectively. In an age where misinformation is rampant, the ability to think critically is invaluable. Students who are educated can discern between reliable and unreliable sources, which is vital for their future success. Moreover, education fosters social cohesion. Schools are often where children learn to interact with others, make friends, and develop social skills. However, not everyone have access to quality education, which can lead to inequality in society. This disparity in education can perpetuate cycles of poverty and limit opportunities for many individuals. Furthermore, the economic impact of education cannot be overstated. A well-educated workforce is essential for economic growth and innovation. Companies tend to prefer hiring individuals with higher levels of education, which often leads to better job prospects and higher salaries. As a result, investing in education is also an investment in a country’s economy. In conclusion, the significance of education in today’s society is clear. It enhances critical thinking skills, promotes social cohesion, and drives economic growth. Therefore, it is imperitive that we continue to prioritize education for all individuals, regardless of their background.'

  const originalEssayString = 'The advancments in technolagy have revolutionized the way we comunicate and access information. With the rise of smartphons, tablets, and computers, people can now conect with others around the globe instanly. However, this rapid devlopment also comes with some challenges, such as the increase in cybercrime and the growing dependency on digital devices. As technolagy continues to evolve, it is crucial for societys to find a balance between embracing innovation and ensuring securty.'

  let ErrorEssay = ''

  const SuggestionEssay = ''


  const fetchEssayResults = async() => {
    
    try{

      const response = await axios.post('http://127.0.0.1:8000/user/essay/check/', 
        {
          'question1' : question1,
          'composition' : originalEssayString
        }
      );
      
      setResult(response.data);
      console.log(response);
      
      //get the spelling error and then highlight it to the original composition

      

    }catch(error){
      console.log('Error in Comparison component @ fetchEssayResults function');
      throw error;
    }

  }


  const [OriginalComposition, SetOriginalComposition] = useState([])

  const HighlightSpellErrors = () => {
    
    const spelling_errors = result.data.spelling_errors
    const Original_composition = result.data.Original_Composition


    spelling_errors.foreach((Error_dict) => {




    })


  }


  const toggleComment = () => {
    setShowComment(!showComment);
  };


  //side effect execute after initial render
  useEffect(() => {

    //execute here the function for side effects
    fetchEssayResults()


  }, [])



  return (
    <>
    <div>
        <div className='flex flex-col items-center justify-center text-xl pt-4 text-primary dark:text-white text-center font-poppins'>
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
            <textarea placeholder="Comment to Student" className="w-10/12 h-full sm:w-10/12 md:w-10/12 lg:w-8/12 pl-2 pt-2 pb-72 sm:pb-60 md:pb-42 lg:pb-24 text-lg border rounded-lg justify-start text-start text-primary dark:text-white bg-white dark:bg-primary border-gray-300" type="text"></textarea>
            </div>
                
                <div className='w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 flex justify-end text-sm'>
                    <button type="submit" className="bg-green-600 text-primary dark:text-white px-[40px] py-2 mt-2 rounded-lg items-end" >
                        Send 
                    </button>
                </div>
        </div>
        )}

        <div className='flex flex-col items-center justify-center text-xl text-primary dark:text-white text-center mb-4 font-poppins'>
          <div className='w-8/12 flex flex-col sm:flex-row  items-center justify-start text-xl pt-2 text-primary dark:text-white text-center'>
            <p>Context: Understanding myself</p>

          </div>  
        </div>
    
      

      <div className='flex flex-col sm:flex-row text-center justify-center'>
      <div className=" w-full flex flex-col bg-violet-500 border border-violet-500 rounded-lg mb-4 p-4 font-poppins">
        <div className='flex flex-col text-xl justify-start text-white'>
          <div className='flex flex-col xxs:flex-row xs:flex-row justify-around xs:justify-evenly items-center text-center  mb-2'>
            <span className='m-1'>Readability 100%</span>
            <span className='m-1'>Understanding 100%</span>
            
          </div>
        </div>
        <div className='flex flex-col  text-xl justify-start text-white'>
          <div className='flex flex-col xxs:flex-row xs:flex-row justify-around xs:justify-evenly items-center text-center  mb-2'>
            <span className='m-1'>Macro 90%</span>
            <span className='m-1'>Damage 999%</span>
            
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-violet-500 border border-violet-500 rounded-lg ml-0 sm:ml-4  mb-4 p-4 font-poppins">
        <div className='flex flex-col text-xl justify-start  text-white'>
          <p className=''>ULTIMATE CHAMPION</p>
        </div>
      </div>
      </div>

      <h2 className='flex items-center justify-center font-poppins text-dark dark:text-white text-2xl font-semibold'>Question: What is your biggest fear?</h2>
    </div> 
    <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-6">
      
      <div className="relative">
        <div>
          <div className="flex flex-row justify-around items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-2xl font-poppins text-dark dark:text-white font-semibold">Original Composition</h1> {/* Fix margin : DONE */}
            <h1 className="text-2xl font-poppins text-dark dark:text-white font-semibold">Suggested Result</h1>
          </div>
          
          <div className="flex flex-row justify-evenly text-justify relative"> 
            <p className="text-2xl font-poppins text-dark dark:text-white w-5/12">
              {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={true}></NormalSpan>) : (<span>Loading Please Wait..</span>)}
            </p>
            <div className="border-l-2 border-gray-500 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div> {/* Vertical Line */}
            <p className="text-2xl font-poppins text-dark dark:text-white w-5/12">
            {result ? (<NormalSpan Sents={result && result.Original_Composition} errors_array={result && result.spelling_errors} original={false}></NormalSpan>) : (<span>Loading Please Wait..</span>)}
            </p>
          </div>
          <div className="flex flex-row justify-evenly items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-3xl font-poppins text-green-500 mt-14 font-semibold">Analysis</h1>
          </div>
          <div className=" h-full flex flex-col sm:flex-row justify-center items-center bg-gray-200 rounded-lg font-poppins">
            <div className={` ${styles.paddingY} w-full px-6`}>
                <div className="flex flex-row justify-start text-lg text-dark dark:text-white mb-4">
                  <div className="text-lg text-primary mr-6">Phrase Correction ID : 1</div>
                  <div className="text-lg text-primary">Error Type: Verb Tense</div>
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-primary mb-4'>
                  <div className="flex flex-row"></div>
                  <div className='mr-56'></div>
                  <div className="text-lg text-primary mr-4 mb-4">Explanation : Mauris a sollicitudin turpis. Cras tincidunt,h</div> {/* Align this to Error type: Verb Tense */}
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-primary mb-4'>
                  <div className="flex flex-row"></div>
                  <div className='mr-56'></div>
                  <div className="text-lg text-primary mr-4">Solution: Changes this “Verb” to this Form “Formated Verb”</div> {/* Align this to Error type: Verb Tense */}
                </div>
            </div>
          </div>
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

export default Comment