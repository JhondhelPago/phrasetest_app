import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import NormalSpan from './SpanComponent';

const Comparison = () => {

  const [result, setResult] = useState(null)

  //const originalEssayString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.'

  const question1 = 'What is your biggest fear?'

  const originalEssayString = 'Education plays a crucial role in the developement of individuals and societies. It is a tool that equips people with knowledge, skills, and values that are essential for personal and professional growth. In today’s rapidly changing world, having a good education is more important than ever. Firstly, education helps people to think critically. It teaches students how to analyse information, make informed decisions, and solve problems effectively. In an age where misinformation is rampant, the ability to think critically is invaluable. Students who are educated can discern between reliable and unreliable sources, which is vital for their future success. Moreover, education fosters social cohesion. Schools are often where children learn to interact with others, make friends, and develop social skills. However, not everyone have access to quality education, which can lead to inequality in society. This disparity in education can perpetuate cycles of poverty and limit opportunities for many individuals. Furthermore, the economic impact of education cannot be overstated. A well-educated workforce is essential for economic growth and innovation. Companies tend to prefer hiring individuals with higher levels of education, which often leads to better job prospects and higher salaries. As a result, investing in education is also an investment in a country’s economy. In conclusion, the significance of education in today’s society is clear. It enhances critical thinking skills, promotes social cohesion, and drives economic growth. Therefore, it is imperitive that we continue to prioritize education for all individuals, regardless of their background.'

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


  //side effect execute after initial render
  useEffect(() => {

    //execute here the function for side effects
    fetchEssayResults()


  }, [])



  return (
    <>
    <div>
      <h1 className='flex items-center justify-center font-poppins text-dark dark:text-white text-3xl mb-11 text-center font-bold'>CHECK EXAMINED QUESTION ESSAY 1</h1>
      <h2 className='flex items-center justify-center font-poppins text-dark dark:text-white text-2xl font-semibold'>Question: What is your biggest fear?</h2>
    </div> 
    <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-14">
      
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
          <div className=" h-full flex flex-row justify-center items-center bg-gray-500 rounded-lg font-poppins">
            <div className={` ${styles.paddingY} w-full px-6`}>
                <div className="flex flex-row justify-start text-lg text-dark dark:text-white mb-4">
                  <div className="text-lg text-dark dark:text-white mr-6">Phrase Correction ID : 1</div>
                  <div className="text-lg text-dark dark:text-white">Error Type: Verb Tense</div>
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-dark dark:text-white mb-4'>
                  <div className="flex flex-row"></div>
                  <div className='mr-56'></div>
                  <div className="text-lg text-dark dark:text-white mr-4 mb-4">Explanation : Mauris a sollicitudin turpis. Cras tincidunt,h</div> {/* Align this to Error type: Verb Tense */}
                </div>
                <div className='flex flex-row justify-start items-center text-lg text-dark dark:text-white mb-4'>
                  <div className="flex flex-row"></div>
                  <div className='mr-56'></div>
                  <div className="text-lg text-dark dark:text-white mr-4">Solution: Changes this “Verb” B====D to this Form “Formated Verb”</div> {/* Align this to Error type: Verb Tense */}
                </div>
            </div>
          </div>
          <div className=" flex md:flex md:items-center text-center justify-center mt-11">
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

export default Comparison