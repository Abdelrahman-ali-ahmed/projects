import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handelScore, handelScoreFinal } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { decode } from "html-entities";
import "./QuizeQuestion.css";
function QuizQuestion() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);
  const token = useSelector((state) => state.token);
  const score = useSelector((state) => state.score);
  const language= useSelector((state) => state.language);
  const age = useSelector((state) => state.age);
  const scorefinal = useSelector((state) => state.scorefinal);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [response, setResponse] = useState(null);
  const [lastpoints, setlastpoints] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let points = 0;
  const navigate = useNavigate();

  // console.log(age);
  useEffect(() => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    const fetchQuestions = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      try {
        const endpoint =
          test !== 5
            ? `http://127.0.0.1:8000/api/test-question/${test}`
            : "http://127.0.0.1:8000/api/images-test";
        const response = await fetch(endpoint, { headers: myHeaders });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log(result);
        setResponse(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, test]);

  const handleAnswerClick = (answer, idx) => {
    const question = response[questionIndex];

    if (test !== 5) {
      switch (idx) {
        case 0:
          points = test === 6 || test === 5 ? 0 : 0;
          setlastpoints(points);
          break;
        case 1:
          points = test === 6 || test === 5 ? 1 : 1;
          setlastpoints(points);
          break;
        case 2:
          points = test === 6 || test === 5 ? 2 : 2;
          setlastpoints(points);
          break;
        case 3:
          points = test === 6 || test === 5 ? 3 : 3;
          setlastpoints(points);
          break;
        case 4:
          points = 4;
          setlastpoints(points);
          break;
        default:
          break;
      }
      //  if(idx==1){
      //   dispatch(handelScore(score + points));
      //  }
    } else {
      switch (idx) {
        case 0:
          points = 1;
          break;
        case 1:
          points = 0;
          break;
        case 2:
          points = 0;
          break;
        case 3:
          points = 0;
          break;
        case 4:
          points = 0;
          break;
        default:
          break;
      }
    }

    dispatch(handelScore(score + points));

    if (questionIndex + 1 < response.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("test_id", `${test}`);
      urlencoded.append("result", `${score + points}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8000/api/store-result", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      dispatch(handelScoreFinal(score + points));

      dispatch(handelScore(0));
      navigate("/result", { replace: true });
    }
  };

  if (loading) {
    return (
      <Box mt={20} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={20} textAlign="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }
  console.log(response[1]["answer1"]);

  //   const handelresult=()=>{
  //     switch (test){
  //         case 3:
  //             if(scorefinal>45){
  //                 return(<div> <p>child have hyper activity</p></div>)
  //             }
  //             break;
  //         case 4:
  //             if(scorefinal>90){
  //                 return(<div> <p>child have hyper activity</p></div>)
  //             }
  //             break;

  //         case 1:
  //           const autiusm=scorefinal/3;
  //             if(scorefinal>90){
  //                   return(<div> <p>child have hyper activity</p></div>)
  //               }
  //             break;
  //         case 2:
  //             if(scorefinal>90){
  //                     return(<div> <p>child have hyper activity</p></div>)
  //                 }
  //             break;
  //     }
  // }
  const handelback = () => {
    setQuestionIndex(questionIndex - 1);
    dispatch(handelScore(score - lastpoints));
  };
  const handelnext = () => {
    setQuestionIndex(questionIndex + 1);
  };
  console.log(score);
  console.log(points);
  return (
    <div>
      <div className="container">
        <Box p={3}>
          <Typography mt={10} variant="h4">Question {questionIndex + 1}</Typography>
          <Typography mt={10}>
            <div className="question">
              {test !== 5 ? (
                decode(response[questionIndex][language === 'Arabic' ? 'Arabic Name' : 'English Name'])
              ) : (
                <img src={`http://127.0.0.1:8000/storage/${response[questionIndex]["Name"]}`} alt="Question" />
              )}
            </div> {/* Closing tag added here */}
          </Typography>
          {['answer1', 'answer2', 'answer3', 'answer4', 'answer5'].map((answer, idx) => (
            response[questionIndex][`${answer} ${language === 'Arabic' ? 'arabic' : 'English'}`] !== null && (
              <Box mt={2} key={idx}>
                <Button onClick={() => handleAnswerClick(answer, idx)} variant="contained">
                  {test !== 5 ? (
                    decode(response[questionIndex][`${answer} ${language === 'Arabic' ? 'arabic' : 'English'}`])
                  ) : (
                    <img src={`http://127.0.0.1:8000${response[questionIndex][answer]}`} alt={`Answer ${idx + 1}`} />
                  )}
                </Button>
              </Box>
            )
          ))}
          <Box mt={2}>
            {questionIndex > 0 && (
              <Button onClick={handelback} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                Back
              </Button>
            )}
            {questionIndex < response.length - 1 && (
              <Button onClick={handelnext} variant="contained" color="primary">
                Next
              </Button>
            )}
          </Box>
          <Typography mt={5}>
            {questionIndex + 1} / {response.length}
          </Typography>
        </Box>
      </div>
    </div>
  );
  
}

export default QuizQuestion;
