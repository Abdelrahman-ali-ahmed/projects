import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handelMount, handelScore } from '../redux/action';


function Final_screen() {
  const {score,}=useSelector(state=>state);
  const dispatch=useDispatch()
  const history=useNavigate()
  const handelClickAnswer=()=>{
    dispatch(handelScore(0));
    dispatch(handelMount(50));
history('/');
  }

  return (
    <div>
      <Box mt={30}>
        <Typography variant='h3' fontWeight={"bold"} mb={3}>Final_score</Typography>
        <Typography variant='h3' fontWeight={"bold"} mb={3}>{score}</Typography>
        <Button onClick={handelClickAnswer} variant='contained'> setting </Button>
      </Box>
    </div>
  )
};

export default Final_screen;