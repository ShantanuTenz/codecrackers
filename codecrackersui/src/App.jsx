import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import video1 from "./Images/blackBackground3.mp4";
import video2 from "./Images/WhiteBackground.mp4";
import Home from "./Home/Home";
import About from "./About/About";
import LearnNow from "./LearnNow/LearnNow";
import Doubt from "./Doubt/Doubt";
import Header from "./Header/Header";
import LiveDoubt from "./Doubt/LiveDoubt";
import PersonalDoubt from "./Doubt/PersonalDoubt";
import RegisterForm from "./Doubt/Auth/RegisterForm";
import LoginForm from "./Doubt/Auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import store from "./store.js"
import PaymentSuccess from "./Payment/PaymentSuccess.jsx";
import PaymentFailure from "./Payment/PaymentFailure.jsx";
import Verify from "./Doubt/Auth/Verify.jsx";


export default function Main() {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#131052",
      },
      secondary: { 
        main: "#90caf9",
      },
    },
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);

  useEffect(()=> {
    dispatch(getUser(auth.jwt || jwt));
  }, [auth.jwt]);

  return (
      <Router>
        <div className="w-full h-full" style={{ position: "relative", overflow: "hidden" }}>
          <video
            className="w-full h-full absolute top-0 left-0 object-cover"
            loop
            muted
            autoPlay
            src={toggleDarkMode ? video1 : video2}
          />
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header toggleDarkTheme={toggleDarkTheme} />
            <Routes>
              <Route path="/" element={<Home toggleDarkTheme={toggleDarkTheme} />} />
              <Route path="/about" element={<About />} />
              <Route path="/doubt" element={<Doubt />} />
              <Route path="/account/register" element={<RegisterForm />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/account/login" element={<LoginForm />} />
              <Route path="/doubt/live" element={<LiveDoubt />} />
              <Route path="/doubt/personal" element={<PersonalDoubt />} />
              <Route path="/learn" element={<LearnNow />} />
              <Route path="/payment/success/:fullName" element={<PaymentSuccess />} />
              <Route path="/payment/fail" element={<PaymentFailure />} />
            </Routes>
          </ThemeProvider>
        </div>
      </Router>
  );
}
