import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import"./profile.css";
import { handelCategory, handelCategoryName, handelLOGGED, handelSaveAge, handelScore, handelTOKEN } from '../../redux/action';
import { Box, Button, Typography, CircularProgress } from "@mui/material";
function Profile() {
    const token = useSelector(state => state.token);
    const [data, setData] = useState({});
    const dispatch=useDispatch();
   dispatch(handelScore(0));

    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            return;
        }
        console.log(token);

        const myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjZTTmJaaDVMWmNwRiszMGtKbzhnTUE9PSIsInZhbHVlIjoiZUZKeitSb3BXVVZOU3lpbkR0azIwMkNKMlpqVjVNTkw1Tkl2UnRBMm5aRWdEUWFkVERkbHhzdWdBVkdpR0JvZDVnY1kzRW5BU0haZ2JRcFpEd3VaWk5adDJOVkNaZjFnOHFvMTZzWXh2NThtM3FZcjF6SGhsRWtIenVtUkRveDYiLCJtYWMiOiI0YjM4MTlmNWE2NGZjYTBlMzBmOWM1MWJiMjg3NDA5Y2ZlYmY4YjBmNWE2YmYxMDM2MTE0Nzg1MDY4NzhkMzc3IiwidGFnIjoiIn0%3D; ahdl_session=eyJpdiI6IjZTTmJaaDVMWmNwRiszMGtKbzhnTUE9PSIsInZhbHVlIjoiZUZKeitSb3BXVVZOU3lpbkR0azIwMkNKMlpqVjVNTkw1Tkl2UnRBMm5aRWdEUWFkVERkbHhzdWdBVkdpR0JvZDVnY1kzRW5BU0haZ2JRcFpEd3VaWk5adDJOVkNaZjFnOHFvMTZzWXh2NThtM3FZcjF6SGhsRWtIenVtUkRveDYiLCJtYWMiOiI0YjM4MTlmNWE2NGZjYTBlMzBmOWM1MWJiMjg3NDA5Y2ZlYmY4YjBmNWE2YmYxMDM2MTE0Nzg1MDY4NzhkMzc3IiwidGFnIjoiIn0%3D");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://127.0.0.1:8000/api/auth/user-profile?token=${token}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                console.log(result);
               
            })
            .catch((error) => console.error(error));

    }, [token]);
    const category_id=data["category_id"];
    dispatch(handelSaveAge(parseInt(data["age"])));
    function getCategoryName(category_id) {
        switch (category_id) {
            case 1:
                dispatch(handelCategoryName('Difficulty Learning'))
                return 'Difficulty Learning';
            case 2:
                dispatch(handelCategoryName('Autism'))
                return 'Autism';
            case 3:
                dispatch(handelCategoryName('Hyberactivity'))
                return 'Hyberactivity';
            default:
                return 'Unknown';
        }
    }
    let category=getCategoryName(category_id);
    function getTestsByCategoryId(category_id) {
        switch (category_id) {
            case 1:
                return [
                    "Dr. Jamal Al-Khatib, a scale for diagnosing cases of hyperactivity, attention deficit, and impulsivity in children",
                    "Learning Difficulties Scale, Dr. Zidan Al-Sartawy"
                ];
            case 2:
                return [
                    "CARS: Childhood Autism Rating Scale 2",
                    "Gilliam"
                ];
            case 3:
                return [
                    "Prepared by: A. Naima Al-Waheeb - Attention Deficit Hyperactivity Distraction Test",
                    "Dr. Jamal Al-Khatib, a scale for diagnosing cases of hyperactivity, attention deficit, and impulsivity in children"
                ];
            default:
                return [];
        }
    }
    const tests =getTestsByCategoryId(category_id);

    return (
        <Typography mt={10} variant="h4">
        <div>
            <div className='content'>
            {/* {data?.img && <img src={data.img} alt="Profile Image" />}
              <p>{data?.name}</p>
              <p>{data?.email}</p>
              <p>{}</p> */}

<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-6 col-md-12">
                                                <div class="card user-card-full">
                                                    <div class="row m-l-0 m-r-0">
                                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                                            <div class="card-block text-center text-white">
                                                                <div class="m-b-25">
                                                                {data?.img ? (
    <img src={data.img} className="img-radius" alt="Profile Image" />
) : (
    <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User Profile Image" />
)}
                                                                    
                                                                </div>
                                                                <h6 class="f-w-600">{data?.name}</h6>
                                                                <p>{category}</p>
                                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-8">
                                                            <div class="card-block">
                                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Email</p>
                                                                        <h6 class="text-muted f-w-400">{data?.email}</h6>
                                                                    </div>
                                                                   <p> {data.relation}</p>
                                                                </div>
                                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">tests</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                    {tests.map((test, index) => (
                                                                                                    <h6 key={index} className="text-muted f-w-400">{test}</h6>
                                                                                                                                 ))}
                                                                    </div>
                                                                </div>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                             </div>
                                                </div>
                                            </div>
            </div>
        </div>
        </Typography>
    );
}

export default Profile