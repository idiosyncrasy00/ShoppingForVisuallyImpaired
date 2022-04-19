import { useState, Fragment, useEffect } from 'react';
import { useSelector } from "react-redux";
import Button from '../components/General/Button'
import { useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function HomePage2() {
  const loginForm = useSelector((state) => state.loginInfo.value);
  const navigate = useNavigate();

  useEffect(() => {
    function updateScreen() {
      alanBtn({
        key: alanKey,
        onCommand: ({ command }) => {
          if (command === 'home_navigation') {
            //do something
            navigate('/');
          }
          if (command === 'login_navigation') {
            //do something
            navigate('/login');
          }
          if (command === 'register_navigation') {
            //do something
            navigate('/register');
          }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });

  function EnterRoom(e) {
    navigate("/search")
  }
  if (loginForm !== "") {
    return (
      <div>
        {/* <h1>Welcome back {loginForm}. What are you gonna do today?</h1> */}
        <h1>Welcome back. What are you gonna do today?</h1>
        <Button
          className={""}
          type={"button"}
          onClick={(e) => { EnterRoom(e) }}
          buttonName={"Enter this room"}></Button>
      </div>
    );
  }
  return (
    <h1>Watch together, chat together.</h1>
  );
}

export default HomePage2;