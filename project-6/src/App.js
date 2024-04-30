
import { useState } from 'react';
import './App.css';
import NavBar from './component/NavBar';
import NewsBoard from './component/NewsBoard';
import NewsItems from './component/NewsItems';
import useAxios from './hooks/useAxios';

function App() {
  const [category,setCategory]=useState("general");
  // const {response,error,loading}=useAxios({url:"/api_category.php"});
  // console.log(response);
  
  return (
    <div className="App">
 <NavBar setCategory={setCategory}/>
 <NewsBoard category={category}/>
    </div>
  );
}

export default App;
