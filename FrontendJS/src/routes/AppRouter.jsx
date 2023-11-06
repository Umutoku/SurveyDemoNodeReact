import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import CreateSurvey from '../components/CreateSurvey/CreateSurvey';
import SurveyList from '../components/SurveyList/SurveyList';
import SurveyDetail from '../components/SurveyDetail/SurveyDetail';
import ResponseForm from '../components/ResponseForm/ResponseForm';
import Navbar from '../components/Navbar/Navbar';
import ResponsesBySurvey from '../components/ResponsesBySurvey/ResponsesBySurvey';

function AppRouter() {
  return (
<BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createSurvey" element={<CreateSurvey />} />
      <Route path="/" element={<SurveyList/>} />
      <Route path="/survey/:id" element={<SurveyDetail/>} />
      <Route path="/response/:id" element={<ResponseForm/>} />
      <Route path="/responsesBySurvey/:id" element={<ResponsesBySurvey/>} />
    </Routes>
</BrowserRouter>
  );
}

export default AppRouter;
