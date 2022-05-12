import React, { useState, useEffect } from "react";

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  //const [cancelKey, setcancelKey] = useState(false);
  // const [upPressed, setUpPressed] = useState(false);
  // const [downPressed, setDownPressed] = useState(false);
  // const [leftPressed, setLeftPressed] = useState(false);
  // const [rightPressed, setRightPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      //setKeyPressed(true);
      // setDownPressed(true);
      // setUpPressed(false);
      // setLeftPressed(false);
      // setRightPressed(false);
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      //setKeyPressed(false);
      // setDownPressed(false);
      // setUpPressed(true);
      // setLeftPressed(false);
      // setRightPressed(false);
      setKeyPressed(false);
    }
  };

  const cancelHandler = ({ key }) => {
    if (key === targetKey) {
      //setKeyPressed(false);

    }
  }

  // const leftHandler = ({ key }) => {
  //   if (key === targetKey) {
  //     setKeyPressed(true);
  //   }
  // };

  // const rightHandler = ({ key }) => {
  //   if (key === targetKey) {
  //     setKeyPressed(false);
  //   }
  // };
  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // window.addEventListener("keyleft", leftHandler);
    // window.addEventListener("keyright", rightHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      // window.removeEventListener("keyleft", leftHandler);
      // window.removeEventListener("keyright", rightHandler);
    };
  });
  return keyPressed;
};

export { useKeyPress };