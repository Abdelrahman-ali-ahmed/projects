import { Link } from "react-router-dom";
import "./NavBar.css";
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLOGGED, handelSaveLanguage } from '../../redux/action';

function Navbar() {
    const [click, setClick] = useState(false);
    const [color, setColor] = useState(false);
    const logged = useSelector(state => state.logged);
    const language = useSelector(state => state.language);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    const toggleLanguage = language === "English" ? "Arabic" : "English";

    const handleClick = () => {
        setClick(!click);
    }

    const handleLanguageToggle = () => {
        dispatch(handelSaveLanguage(toggleLanguage));
    }

    const handleChangeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleChangeColor);
        return () => {
            window.removeEventListener("scroll", handleChangeColor);
        };
    }, []);

    useEffect(() => {
        const fetchSettings = () => {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch("http://127.0.0.1:8000/api/settings", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.message === "ok") {
                        setData(result.data);
                    }
                })
                .catch(error => console.error(error));
        };

        fetchSettings();
    }, []);

    const renderLinks = () => (
        <>
            <li><Link to="/">Home</Link></li>
            {logged ? (
                <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/quize">Quiz</Link></li>
                    <li><Link to="/guide">Guide</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/updata_profile">Update Profile</Link></li>
                    <li><Link to="/result_history">result history</Link></li>
                    <li><Link to="/logout">Log Out</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/guide">Guide</Link></li>
                </>
            )}
            <li onClick={handleLanguageToggle}>{toggleLanguage}</li>
        </>
    );




    const renderLinksArabic = () => (
        <>
            <li><Link to="/">الارئيسية</Link></li>
            {logged ? (
                <>
                    <li><Link to="/profile">الملف الشخصي</Link></li>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/quize">الاختبار</Link></li>
                    <li><Link to="/guide">الارشاد</Link></li>
                    <li><Link to="/posts">المحادثات</Link></li>
                    <li><Link to="/updata_profile">تحديث الملف الشخصي</Link></li>
                    <li><Link to="/result_history">سجل النتائج</Link></li>
                    <li><Link to="/logout">تسجيل الخروج</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/register">تسجيل لااول مره</Link></li>
                    <li><Link to="/quize">الاختبارات</Link></li>
                    <li><Link to="/guide">الارشاد</Link></li>
                </>
            )}
            <li className={"language"} onClick={handleLanguageToggle}>{toggleLanguage}</li>
        </>
    );


    return (
        <div className={color ? "Header Header-bg" : "Header"}>
            <Link to="/">
                {data.logo ? (
                    <img src={`http://127.0.0.1:8000/${data.logo}`} alt="Logo" height="50px" width="50px" />
                ) : (
                    <h1>Icon</h1>
                )}
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                {language==="English"?renderLinks() :renderLinksArabic()}
            </ul>
            <div className="nav-icon" onClick={handleClick}>
                {click ? <FaTimes size={20} style={{ color: "#fff" }} /> : <FaBars size={20} style={{ color: "#fff" }} />}
            </div>
        </div>
    );
}

export default Navbar;
