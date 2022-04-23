import { useState, Fragment, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShoppingCard from '../components/General/ShoppingCard';
import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function HomePage2() {
  const loginForm = useSelector((state) => state.loginInfo.value);
  const navigate = useNavigate();

  useEffect((e) => {
    function updateScreen() {
      alanBtn({
        key: alanKey,
        onCommand: function (commandData) {
          switch (commandData.command) {
            case 'home_navigation':
              navigate('/');
              break;
            case 'login_navigation':
              navigate('/login');
              break;
            case 'register_navigation':
              navigate('/register');
              break;
            default:
              console.log('Unknown command: ' + commandData.command);
          }
          // if (commandData.command === 'home_navigation') {
          //   //do something
          //   navigate('/');
          // }
          // if (commandData.command === 'login_navigation') {
          //   //do something
          //   navigate('/login');
          // }
          // if (commandData.command === 'register_navigation') {
          //   //do something
          //   navigate('/register');
          // }
          // //form filling
          // if (commandData.command === 'start_filling_in_the_login') {
          //   console.log("Ready to fill....");
          // }
          // if (commandData.command === 'get_username') {
          //   alert(commandData.text);
          //   setUserName(commandData.text);
          //   //document.getElementById('username').value = commandData.text;
          // }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });

  function EnterRoom(e) {
    navigate("/search")
  }
  function addToTheCart() {
    console.log("Add item to the cart");
  }
  if (loginForm !== "") {
    return (
      <div>
        {/* <h1>Welcome back {loginForm}. What are you gonna do today?</h1> */}
        <h1>Welcome back. What are you gonna do today?</h1>
        <Button onClick={(e) => { EnterRoom(e) }}>Click</Button>
        <Container>
          <Row>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
            <Col>
              <ShoppingCard
                img={""}
                title={"Samsung galaxy Note 2"}
                text={"It's a good phone, go buy it please"}
                addToTheCart={addToTheCart}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  return (
    <h1>Watch together, chat together.</h1>
  );
}

export default HomePage2;