import { Box, Button, Typography ,CircularProgress} from '@mui/material';
import useAxios from '../hooks/useAxios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handelMount, handelScore } from '../redux/action';
import { useDispatch } from 'react-redux';
import {decode} from 'html-entities';


const getrandomeInteger=(max)=>{
  return Math.floor(Math.random() * Math.floor(max))
};
function Qu() {
  const { questionCategory,questionDifficulty,questionType,amount_question,score,}=useSelector(state=>state);
  const apiUrl=`https://opentdb.com/api.php?amount=${amount_question}&category=${questionCategory}&difficulty=${questionDifficulty}&type=${questionType}`;
  const {response,error,loading}=useAxios({url:apiUrl});
  const [questionIndex,setQuestionIndex]=useState(0);
  const [option,setOption]=useState([]);
  const history=useNavigate();
  const dispatch=useDispatch();
  
    
  console.log(option);
  useEffect(()=>{
    if(response?.results.length){
      const question =response.results[questionIndex];
      let Answer=[...question.incorrect_answers]
      console.log(question.correct_answer);
      Answer.splice(
        getrandomeInteger(question.incorrect_answers.length),
        0,
        question.correct_answer,
        
      );
      setOption(Answer);
    }
  },[response,questionIndex])
 

  if(loading==true){
    return(
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }
  
  const handelClickAnswer=(e)=>{
    const question = response.results[questionIndex];
    let answerValue=e.target.textContent;
        answerValue=answerValue.trim();
    let correct_answer=question.correct_answer;
        correct_answer=correct_answer.trim();
    let value=( answerValue === correct_answer );

    console.log(answerValue,correct_answer);
    console.log(value);
    if (value) {
      dispatch(handelScore(score + 1));
    }
    else
    {console.log("wrong");}



    if(questionIndex + 1 < response.results.length)
    {setQuestionIndex(questionIndex + 1)}
    else{
      if(questionIndex + 1 == response.results.length){

        history('/Final_screen');
      }
    }
    
   
    
  }
  return (

    <div><Box>
      <Typography variant='h4'>Question {questionIndex+1}</Typography>
      <Typography mt={5}>{decode(response.results[questionIndex].question)}</Typography>
      {option.map((id,data)=>{
        return(<Box mt={2} key={data}>
          <Button onClick={handelClickAnswer} variant='contained'> {decode(id)}</Button>
        </Box>)
      })}
      
  
       {score}/{response.results.length}
      </Box>
      </div>
  )
};

export default Qu;