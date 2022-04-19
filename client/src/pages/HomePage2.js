import { useState, Fragment, useEffect } from 'react';
import { useSelector } from "react-redux";
import Button from '../components/General/Button'
import { useNavigate } from 'react-router-dom';


function HomePage2() {
  const loginForm = useSelector((state) => state.loginInfo.value);
  const navigate = useNavigate();
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