import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Allcoin from '../Component/Allcoin/Allcoin';
import Header from '../Layout/Header/Header';


const Routingpage = () => {
  return (
    <Router>
      <Header/>
        <Routes>
            <Route path='/Allcoin' element={<Allcoin/>}/>
        </Routes>
    </Router>
  )
}

export default Routingpage