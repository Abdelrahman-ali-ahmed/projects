import logo from './logo.svg';
import {BrowserRouter,Routes,Switch,Route, NavLink} from "react-router-dom";
import React from 'react';
import Setting from './pages/Setting';
import Qu from './pages/Qu';
import Final_screen from './pages/Final_screen';
import {Box, Container, Typography}from '@mui/material';
function App() {
  return (
    <div className="App">
 
    <BrowserRouter>
    <Container maxWidth='sm'>
      <Box textAlign='center' mt={5}>
      <Typography variant='h2' fontWeight="bold"> Quizze App</Typography>
    <Routes>

      <Route path='/' element={<Setting/>}> </Route>
      <Route path='/Final_screen' element={<Final_screen/>} ></Route>
      <Route path='/Question' element={<Qu/>}></Route>

    </Routes>
    
    </Box>
    </Container>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
