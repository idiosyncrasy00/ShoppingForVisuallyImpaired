import { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShoppingCard from '../components/General/ShoppingCard';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../redux/cart'


import { alanBtn } from '@alan-ai/alan-sdk-web';
import { useKeyPress } from '../components/General/KeyPressed'
const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

const itemArray = [
  {
    img: "",
    title: "Samsung galaxy note 2",
    text: "hfaskdjfsd",
    price: 5000,
  },
  {
    img: "",
    title: "Samsung galaxy note 3",
    text: "hfaskdjfsd",
    price: 1000,
  },
  {
    img: "",
    title: "Samsung galaxy note 4",
    text: "hfaskdjfsd",
    price: 5000,
  }
  ,
  {
    img: "",
    title: "Samsung galaxy note 5",
    text: "hfaskdjfsd",
    price: 4000,
  }
  ,
  {
    img: "",
    title: "Samsung galaxy note 6",
    text: "hfaskdjfsd",
    price: 5000,
  }
  ,
  {
    img: "",
    title: "Samsung galaxy note 7",
    text: "hfaskdjfsd",
    price: 5000,
  }
  ,
  {
    img: "",
    title: "Samsung galaxy note 8",
    text: "hfaskdjfsd",
    price: 5000,
  }
  ,
  {
    img: "",
    title: "Samsung galaxy note 9",
    text: "hfaskdjfsd",
    price: 5000,
  }
]

function HomePage2() {
  //const cartInfo = useSelector((state) => state.cartInfo.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //select default in item 0;
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowUp = useKeyPress("ArrowUp");
  // const ArrowLeft = useKeyPress("ArrowLeft");
  // const ArrowRight = useKeyPress("ArrowRight");
  const enterPress = useKeyPress("Enter");

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
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });

  function EnterRoom(e) {
    navigate("/search")
  }

  function clickEvent() {

  }

  function addToTheCart(id, item, e) {
    e.preventDefault()
    console.log(`Add item with id ${id} to the cart`);
    console.log(`ITem info is: ${item.title}, ${item.text}, ${item.price}`)
    dispatch({
      title: item.title,
      text: item.text,
      price: item.price,
    })
  }

  useEffect(() => {
    if (itemArray.length && ArrowDown) {
      setCursor(prevState =>
        prevState < itemArray.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [ArrowDown]);
  useEffect(() => {
    if (itemArray.length && ArrowUp) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [ArrowUp]);
  // useEffect(() => {
  //   if (itemArray.length && ArrowLeft) {
  //     setCursor(prevState =>
  //       prevState < itemArray.length - 1 ? prevState - 1 : prevState
  //     );
  //   }
  // }, [ArrowLeft]);
  // useEffect(() => {
  //   if (itemArray.length && ArrowRight) {
  //     setCursor(prevState => (prevState > 0 ? prevState + 1 : prevState));
  //   }
  // }, [ArrowRight]);
  useEffect(() => {
    if (itemArray.length && enterPress) {
      setSelected(itemArray[cursor]);
    }
    console.log("Index is: " + cursor)
  }, [cursor, enterPress]);
  useEffect(() => {
    if (itemArray.length && hovered) {
      setCursor(itemArray.indexOf(hovered));
    }
  }, [hovered]);
  return (
    <>
      <h1>Welcome back. What are you gonna do today?</h1>
      <Button onClick={(e) => { EnterRoom(e) }}>Click</Button>
      <span>Selected: {selected ? selected.title + selected.text + selected.price : "none"}</span>
      <Container>
        <Row>
          {/* {itemArray.map(item =>)} */}
          {
            itemArray.map((item, index) => (
              <ShoppingCard
                img={item.img}
                title={item.title}
                text={item.text}
                index={index}
                //key={item.id}
                active={index === cursor}
                item={item}
                setSelected={setSelected}
                setHovered={setHovered}
                addToTheCart={() => dispatch(addToCart({
                  title: item.title,
                  text: item.text,
                  price: item.price,
                }))}
              />
            )
            )
          }
        </Row>
      </Container>
      <button onClick={clickEvent()}>Click lol</button>
    </>
  );
}

export default HomePage2;