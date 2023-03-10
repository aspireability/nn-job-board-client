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
