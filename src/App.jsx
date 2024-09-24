import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//importing pages component
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import ThankYou from './pages/Thankyou';
import Assessment from './pages/Assessment';
import ExamineResults from './pages/ExamineResults';
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
        <Route path="/examineresults" element={<ExamineResults></ExamineResults>}></Route>
        <Route path="/thankyou" element={<ThankYou></ThankYou>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
