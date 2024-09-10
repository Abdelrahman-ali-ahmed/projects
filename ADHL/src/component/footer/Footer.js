import { FaFacebook, FaHome, FaLinkedin, FaMailBulk, FaPhone, FaTwitter } from "react-icons/fa"
import"./Footer.css"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Footer() {
  const [data, setData] = useState([]);
  const language = useSelector(state => state.language);
  useEffect(() => {
    const fetchPosts = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("http://127.0.0.1:8000/api/settings", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // console.log(result);
                if(result.message=="ohk"){
                    setData(result.data);
                }
            })
            .catch((error) => console.error(error));
    };

    fetchPosts();
}, [data]);
const renderLinks = () => (
  <>
      <li><Link to="/">Home</Link></li>
      { (
          <>
             <li><Link to={"/about"}>AboutUs</Link></li>
    <li><Link to={"/"}>OurTraining</Link></li>
    <li><Link to={"/our_team"}>OurTeam</Link></li> 
    <li><Link to={"/"}>ContactUs</Link></li>
          </>
      ) }
     
  </>
);

const renderLinksArabic = () => (
  <>
      <li><Link to="/">الرئيسية</Link></li>
      { (
          <>
             <li><Link to={"/about"}>معلومات عنا</Link></li>
    <li><Link to={"/"}>برامجنا</Link></li>
    <li><Link to={"/our_team"}>فريقنا</Link></li> 
    <li><Link to={"/"}>للتواصل معنا</Link></li>
          </>
      ) }
     
  </>
);

  return (
    <div className="footer">
        <div className="footer-contanier">
            <div className="left">

                {/* <img></img> */}
                
            </div>
            <div className="midel">
            <ul className={"footer-bar"}>
  
    { language==="English"?renderLinks():renderLinksArabic()}
    </ul>
                
                </div>


            <div className="right">

<div className="social"> 
                    
                  <Link to={`${data.facebook}`}><FaFacebook size={30} style={{color:"#fff",marginRight:"1rem"}}/></Link>  
                  <Link to={`${data.twitter}`}><FaTwitter size={30} style={{color:"#fff",marginRight:"1rem"}}/></Link>
                   <Link to={`${data.linkedin}`}><FaLinkedin size={30} style={{color:"#fff",marginRight:"1rem"}}/></Link> 
                
                    </div>
                    
            </div>
            



        </div>
       <div className="br"></div>
<div className="contanir88"><p>copyright</p> <span></span><p>2023 All rght reserved|Developer</p></div>
       
    </div>
  )
}

export default Footer