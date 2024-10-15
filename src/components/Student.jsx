import React from 'react'
import styles from '../style';


const Student = () => {
  return (

    <>
       
        <div className={`flex flex-col w-full items-center justify-center min-h-screen xs:w-full font-poppins`}>

            <h1 className='text-2xl font-bold
             text-primary dark:text-white mb-5 mt-4 xs:mt-24'>
            Welcome! MAH Boi _________ Lapag Your Deets.
            </h1>

            <div className={`${styles.boxWidth}flex flex-col items-center justify-center w-full h-full`}>

                
                <div className='flex flex-row w-full items-start'>
                
                {/*Email Side*/}
                <div className='flex flex-col w-1/2'>
                    <div className=' text-base font-thin  text-primary dark:text-white'>
                        Email<span className='text-red-500'>*</span>
                    </div>
                
                    <div className='w-full flex flex-col'>
                        <input type="email" placeholder=" Email" className='w-11/12 text-primary pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                    </div>
                </div>
                
                {/*Username Side*/}
                <div className='flex flex-col w-1/2'>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Username<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input type="email" placeholder=" Username" className='w-full text-primary pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                    </div>
                </div>

                </div>
                
                <div className='flex flex-row w-full items-start'>
                
                {/*First Name Side*/}
                <div className='flex flex-col w-1/3'>
                    <div className=' text-base font-thin  text-primary dark:text-white'>
                        First Name<span className='text-red-500'>*</span>
                    </div>
                
                    <div className='w-full flex flex-col '>
                        <input required type="text" placeholder=" First Name" className='w-11/12 text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                    </div>
                </div>
                
                {/*Middle Name Side*/}
                <div className='flex flex-col w-1/3 '>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Middle Name<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input required type="text" placeholder=" Middle Name" className='w-11/12 text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                    </div>
                </div>

                 {/*Last Name Side*/}
                 <div className='flex flex-col w-1/3'>
                    <div className='flex  text-base font-thin text-primary dark:text-white'>
                        Last Name<span className='text-red-500'>*</span>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input required type="text" placeholder=" Last Name" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                    </div>
                </div>

                </div>


                <div className='flex flex-row w-full items-start'>
                
                        {/*Age Side*/}
                        <div className='flex flex-col w-1/2 pr-2'>
                            <div className=' text-base font-thin  text-primary dark:text-white'>
                                Age<span className='text-red-500'>*</span>
                            </div>
                        
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                            </div>
                        </div>
                        
                        {/*Gender Side*/}
                        <div className='flex flex-col w-1/2 pl-2'>
                            <div className='flex  text-base font-thin text-primary dark:text-white'>
                                Gender<span className='text-red-500'>*</span>
                            </div>

                            <div className='w-full flex flex-col '>
                                <select for="gender" type="email" placeholder=" Username" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4 '>
                                <option value={''} disabled selected> Select your Gender</option>
                                <option value={1}>Male</option>
                                <option value={1}>Female</option>
                                </select>
                            </div>
                        </div>

                </div>


                
                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white'>
                    School Name<span className='text-red-500'>*</span>
                </div>
                
                <div className='w-full flex flex-col'>
                    <input type="text" placeholder="SchoolName" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                </div>
                </div>

                <div className='flex flex-row w-full items-start'>
                
                        {/*Age Side*/}
                        <div className='flex flex-col w-1/2 pr-2'>
                            <div className=' text-base font-thin  text-primary dark:text-white'>
                                Grade Level<span className='text-red-500'>*</span>
                            </div>
                        
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                            </div>
                        </div>
                        
                        {/*Gender Side*/}
                        <div className='flex flex-col w-1/2 pl-2'>
                            <div className='flex  text-base font-thin text-primary dark:text-white'>
                                School/Institutional ID<span className='text-red-500'>*</span>
                            </div>

                            <div className='w-full flex flex-col '>
                            <div className='w-full flex flex-col'>
                                <input required type="number" placeholder="Age"  className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none mb-4'/>
                            </div>
                            </div>
                        </div>

                </div>
                
                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white'>
                    Password<span className='text-red-500'>*</span>
                </div>

                <div className='w-full flex flex-col'>
                    <input type="password" placeholder=" Password" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none'/>
                </div>
                </div>

                <div className='flex flex-col'>
                <div className='text-base font-thin  text-primary dark:text-white mt-4'>
                    Confirm Password<span className='text-red-500'>*</span>
                </div>

                <div className='w-full flex flex-col'>
                    <input type="password" placeholder="Confirm Password" className='w-full text-primary  pl-2 mt-2 py-2 border rounded-lg border-gray-500 outline-none focus:outline-none'/>
                </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center mt-4'>
                    
                    <button className='w-1/2 text-white dark:text-primary bg-primary dark:bg-white border-lg border-primary border rounded-lg p-4 text-center flex items-center justify-center mt-4 mb-4'>
                        Submit
                    </button>
                </div>
            </div>
            
        </div>
    
    </>
    
  )
}

export default Student