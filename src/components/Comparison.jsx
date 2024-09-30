import React from 'react'
import styles from '../style'

const Comparison = () => {
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
            <p className="text-2xl font-poppins text-dark dark:text-white  w-5/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.</p>
              <div className="border-l-2 border-gray-500 absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div> {/* Vertical Line */}
            <p className="text-2xl font-poppins text-dark dark:text-white  w-5/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.</p>
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
                  <div className="text-lg text-dark dark:text-white mr-4">Solution: Changes this “Verb” D---B to this Form “Formated Verb”</div> {/* Align this to Error type: Verb Tense */}
                </div>
            </div>
          </div>
          <div className=" flex md:flex md:items-center text-center justify-center mt-11">
                                    <button type="submit" className="bg-green-600 text-primary dark:text-white font-semibold px-[60px] py-2 rounded-lg" >
                                    Save 
                                    </button>
                            </div>
        </div>    
      </div>
    </div>
    </>
  )
}

export default Comparison