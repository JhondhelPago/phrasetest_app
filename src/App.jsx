import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//importing pages component
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import ThankYou from './pages/Thankyou';
import Assessment from './pages/Assessment';
import ExamineResults from './pages/ExamineResults';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudentSignUp from './pages/StudentSignUp';
import TeacherSignUp from './pages/TeacherSignUp';
import OtpPage from './pages/OtpPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import { Student } from './components';



//import Home from './pages/Home';

function App() {

  const [isDark, setIsDark] = useState(false);

  const changeColorTheme = () => {
    setIsDark(!isDark);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} changeColorTheme={changeColorTheme}></Home>}></Route>
        <Route path="/assessment" element={<Assessment></Assessment>}></Route>
        <Route path="/inputform" element={<InputForm isDark={isDark} changeColorTheme={changeColorTheme}></InputForm>}></Route>
        <Route path="/examineresults" element={<ExamineResults isDark={isDark} changeColorTheme={changeColorTheme}></ExamineResults>}></Route>
        <Route path="/thankyou" element={<ThankYou></ThankYou>}></Route>
        <Route path="/loginpage" element={<LoginPage isDark={isDark} changeColorTheme={changeColorTheme}></LoginPage>}></Route>
        <Route path="/signuppage" element={<SignUpPage isDark={isDark} changeColorTheme={changeColorTheme}></SignUpPage>}></Route>
        <Route path="/studentsignup" element={<StudentSignUp isDark={isDark} changeColorTheme={changeColorTheme}></StudentSignUp>}></Route>
        <Route path="/teachersignup" element={<TeacherSignUp isDark={isDark} changeColorTheme={changeColorTheme}></TeacherSignUp>}></Route>
        <Route path="/otppage" element={<OtpPage isDark={isDark} changeColorTheme={changeColorTheme}></OtpPage>}></Route>
        <Route path="/teacherpage" element={<TeacherPage></TeacherPage>}></Route>
        <Route path="/studentpage" element={<StudentPage></StudentPage>}></Route>
        {/* path="/signup" -> select user type. student or teacher? */} 
        {/* path="/signup/student" student signup form */}
        {/* path="/signup/teacher" teacher signup form */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
