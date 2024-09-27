import React from 'react'
import styles from '../style'

const Comparison = () => {
  return (
    <>
    <div>
      <h1 className='flex items-center justify-center font-poppins text-white text-3xl mb-11 text-center'>CHECK EXAMINED QUESTION ESSAY 1</h1>
      <h2 className='flex items-center justify-center font-poppins text-white text-2xl'>Question: What is your biggest fear?</h2>
    </div> 
    <div className="w-full flex-col justify-evenly items-center md:flex-col sm:flex-col mb-6 relative mt-14">
      
      <div className="relative">
        <div>
          <div className="flex flex-row justify-evenly items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-2xl font-poppins text-white">Original Composition</h1> {/* Fix margin */}
            <h1 className="text-2xl font-poppins text-white">Suggested Result</h1>
          </div>
          
          <div className="flex flex-row justify-evenly text-justify relative"> 
            <p className="text-2xl font-poppins text-white w-5/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.</p>
              <div className="border-l-2 border-white absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div> {/* Vertical Line */}
            <p className="text-2xl font-poppins text-white w-5/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod dolor sit amet tellus condimentum, vel vulputate magna vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam at quam vitae tortor volutpat commodo. Integer lacinia dictum massa, nec viverra lectus aliquet et. Mauris a sollicitudin turpis. Cras tincidunt, arcu et ultricies cursus, felis libero dictum risus, nec ultricies libero arcu eget arcu. Nam vel arcu nec urna dapibus scelerisque.</p>
          </div>
          <div className="flex flex-row justify-evenly items-start relative mb-4 text-center xs:text-center md:text-center">
            <h1 className="text-3xl font-poppins text-green-500 mt-14">Analysis</h1>
          </div>
        </div>    
      </div>
    </div>
    </>
  )
}

export default Comparison