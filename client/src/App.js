import React from 'react';
import { Routes, Route, BrowserRouter as Router }  from 'react-router-dom';
import { Container} from '@material-ui/core';
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';



export default function App () {

  return (
    <Router>
        <Container maxwidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth" element={<Auth />}/>
          </Routes>
        </Container>
    </Router>
  )
}