import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'

import React from 'react';
import logo from './logo.svg';

import { Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';
import Job from '../containers/Job';

const App = () => {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:jobId" element={<Job />} />
       </Routes>
    </>
  )
}

export default App;
