import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style';


import { InputDetails, Navbar, Footer, Button,} from '../components';
import { createRoutesFromChildren } from 'react-router-dom';
//import components from components folder


const InputForm = ({isDark, changeColorTheme}) => {

    const navigate = useNavigate();

    //information field state
    const [renderInformation, setRenderInformation] = useState(true);


    //essay field state
    const [renderEssay, setRenderEssay] = useState(false);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [schoolFrom, setSchoolFrom] = useState('');

    
    const [question1, setQuestion1] = useState('What is your biggest fear?');
    const [answer1, setAnswer1] = useState(null);

    const [question2, setQuestion2] = useState('Have u eaten bb gurl?');
    const [answer2, setAnswer2] = useState(null);

    const [question3, setQuestion3] = useState('when does this end?');
    const [answer3, setAnswer3] = useState(null);

    
    // boolean useState to check the if all of the required fields is set
    const [readyState, setReadyState] = useState(false);

    //input fields onChange Event Handler
    const updateUseStates = (e, useState_name) => {
        
        //trigger unreadyState
        setReadyState(false); 

        switch (useState_name){
            
            case 'name': 
                setName(e.target.value);
                break;

            case 'lastname':
                setLastname(e.target.value);
                break;

            case 'nickname':
                setNickname(e.target.value);
                break;

            case 'age': 
                setAge(e.target.value)
                break;

            case 'gender':
                setGender(e.target.value);
                break;

            case 'gradeLevel': 
                setGradeLevel(e.target.value);
                break;

            case 'schoolFrom':
                setSchoolFrom(e.target.value);
                break;

            case 'answer1':
                setAnswer1(e.target.value);
                break;

            case 'answer2':
                setAnswer2(e.target.value);
                break;

            case 'answer3':
                setAnswer3(e.target.value);
                break;
        
        }

        //dedugging



    }
    
    const handleSubmitForm = async(e) => {
        e.preventDefault();


        //logging the useState variables
        console.log(`name: ${name}`);
        console.log(`nickname: ${nickname}`);
        console.log(`age: ${age}`);
        console.log(`gender: ${gender}`);
        console.log(`gradeLevel: ${gradeLevel}`);
        console.log(`schoolFrom: ${schoolFrom}`);



        if(age <= 0){
            alert("Age must be greater than 0");
            return
        }

        if(gender === ''){
            alert("Please select your gender");
        }

        if(gradeLevel === ''){
            alert("Please select your grade level");
            return
        }

        if(schoolFrom === ''){
            alert("Please select your school name");
            return
        }



        //hiding the information input fields by updating the state
        setRenderInformation(false);

        console.log('logging the informationState() function');
        console.log(getInformationState());

        setRenderEssay(true);


        //post block to the server
        // try{

        //     const response = await axios.post(`http://127.0.0.1:8000/user/submit_essay_instance/`, {
        //         name: name,
        //         nickname: nickname,
        //         age: age,
        //         gradeLevel: gradeLevel,
        //         schoolFrom: schoolFrom
        //     });

        //     console.log(response.data);

        // }catch(error){
        //     console.log(`Error in InputForm Component @handleSubmitForm async function, ${error}`);
        //     throw error;
        // }


    }


    const handleEssaySubmit = async(e) => {
        e.preventDefault();

        console.log('this is the handleEssaySubmit function execution');

        console.log(`name: ${name}`);
        console.log(`nickname: ${nickname}`);
        console.log(`age: ${age}`);
        console.log(`gender: ${gender}`);
        console.log(`gradeLevel: ${gradeLevel}`);
        console.log(`schoolFrom: ${schoolFrom}`);
        
        console.log(`question1 : ${question1}`);
        console.log(`answer1 : ${answer1}`);
        console.log(`question2 : ${question2}`);
        console.log(`answer2 : ${answer2}`);
        console.log(`question3 : ${question3}`);
        console.log(`answer3 : ${answer3}`);

        console.log('render thank you page');

        //will set the boolean State to true if the all the required fields is ready to be submitted
        setReadyState(true);

        //will close the Essay Form Div
        setRenderEssay(false)




        //saving the input form to the useState varibles
        //axios operation here using the POST method and passing the object to be handle to the django server
        // try{


        //     //after successful post method route here to the path "/thankyou" using the navigate instance

        // }catch(error){
        //     console.log(`Error in the InputForm Component @handleEssaySubmit arrow function, ${error}`);
        //     throw error;
        // }


        //will redict to the thank you page after the delay of 5 seconds
        // setTimeout(() => {
        //     navigate('/thankyou');
        // }, 5000)




    }


    const handleSubmitForms = async() => {

        try{

            const response = await axios.post(`http://127.0.0.1:8000/user/submit_essay_instance/`, {
                name: name,
                lastname: lastname,
                nickname: nickname,
                age: age,
                gender: gender,
                gradeLevel: gradeLevel,
                schoolFrom: schoolFrom,
                question1: question1,
                answer1: answer1,
                question2: question2,
                answer2: answer2,
                question3: question3,
                answer3: answer3

            });

            console.log(response.data);

            setIsSubmit(true);
            timedecrease(timeDisplay);

        }catch(error){
            console.log(`Error o Inputform Component @handleSubmitForms arrow function, ${error}`);
            throw error;
        }

    }

    const getInformationState = () => {
        return {
            name: name,
            lastname: lastname,
            nickname: nickname,
            age: age,
            gender: gender,
            gradeLevel: gradeLevel,
            schoolFrom: schoolFrom,
        }
    }


    const getEssayState = () => {
        return {
            question1: question1,
            answer1: answer1,
            question2: question2,
            answer2: answer2,
            question3: question3,
            answer3: answer3,
        }
    }

    const checkFields = () => {

        return (age !== '' && gedner !== '' && gradeLevel !== '' && schoolFrom !== '') && (answer1 !== '' && answer2 !== '' && answer3 !== '');

    }

    const [isSubmit, setIsSubmit] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState(5);

    const timedecrease = (time) => {
        if (time > 0) {
          setTimeout(() => {
            setTimeDisplay(time - 1);
            timedecrease(time - 1);
          }, 1000);
        } else {
          navigate('/thankyou');
        }
    };

    //runs after initial render
    useEffect(() => {
        console.log('useEffect is running.')


    }, [])

    return  (
        <> 
            <div className={!isDark && 'dark'}>   
                <section className='bg-white w-full overflow-hidden text-primary dark:text-white dark:bg-primary'>
                    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                        <div className={`${styles.boxWidth}`}>
                            <Navbar />
                        </div>
                    </div>

                    {/* div for InputDetails component */}
                    {/* <div className={` flex justify-center items center w-[100%] h-[100vh] bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                            <InputDetails updateUseStates={updateUseStates} handleSubmitForm={handleSubmitForm} />
                        </div>
                    </div> */}

                    

                    <div className={` flex justify-center items center w-[100%] h-[100%] bg-white dark:bg-primary ${styles.flexStart}`}>
                        
                        <div className={`${styles.boxWidth} ${styles.paddingY}`}>
                        <Button isDark={isDark} changeColorTheme={changeColorTheme}/>
                            <InputDetails
                                updateUseStates={updateUseStates}
                                handleSubmitForm={handleSubmitForm}
                                handleEssaySubmit={handleEssaySubmit}
                                renderInformation={renderInformation}
                                setRenderInformation={setRenderInformation}
                                renderEssay={renderEssay}
                                setRenderEssay={setRenderEssay}
                                getInformationState={getInformationState}
                                getEssayState={getEssayState}
                                readyState={readyState}
                                handleSubmitForms={handleSubmitForms}
                                isSubmit={isSubmit}
                                timeDisplay={timeDisplay}
                            />
                        </div>
                        <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] overflow-hidden rounded-full blue__gradient"/>
                        <div className="absolute z-[0] w-[30%] h-[30%] -left-[50%] overflow-hidden rounded-full white__gradient"/>
                        <div className="absolute z-[0] w-[10%] h-[10%] -left-[50%] overflow-hidden rounded-full white__gradient"/>
                    </div>


                    {/* Button element here
                        need to be centered
                    */}

                    <div className={` flex justify-bottom items center w-[100%] h-[100%] bg-white text-primary dark:text-white dark:bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth} ${styles.paddingY}`}>
                            
                            <Footer 
                            />
                        </div>
                    </div>

                    


                    {/* if fields are not null then render the essay questionaire */}
                    {/* <div className={`bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                            <EssayField />
                        </div>
                    </div> */}
                </section>
            </div>
        </>
    )
}

export default InputForm