import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import SelectFiled from '../components/SelectFiled';
import TextFieldComponent from '../components/TextFieldComponent';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';



function Setting() {
  const {response,error,loading}=useAxios({url:"/api_category.php"});
  const history=useNavigate();
  console.log(response);

  const difficultyOption=[
  {id:"easy",name:"Easy"},
  {id:"medium",name:"Medium"},
  {id:"hard",name:"Hard"},];

  const typOption=[
    {id:"multiple",name:"Multiple Choice"},
    {id:"boolean",name:"True Or False"},];

  const handelSubmit=(e)=>{
    e.preventDefault();
    history('/Question')

  }
  
  if(loading==true){
    return(
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }
  if(error){
    return(
      <Typography variant='h6'  mt={20} color={"red"} fontWeight="bold"> {error}</Typography>
    )
  }
  return (
    <div>
      
      
      <form onSubmit={handelSubmit}>
        <SelectFiled options={response.trivia_categories} label="category"/>
        <SelectFiled options={difficultyOption} label="Difficulty"/>
        <SelectFiled options={typOption} label="Type"/>
        <TextFieldComponent/>
        <Box mt={3} width="100%">
          <Button fullWidth variant='contained' type='submit'>Get Started</Button>
        </Box>
      </form>
     </div>
  )
};

export default Setting;