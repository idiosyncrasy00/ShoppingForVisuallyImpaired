import { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Form, FormControl } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import ShoppingCard from '../components/General/ShoppingCard';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../redux/cart'
import { useSpeechSynthesis } from "react-speech-kit";


import { alanBtn } from '@alan-ai/alan-sdk-web';
import { useKeyPress } from '../components/General/KeyPressed'
const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

const productsList = [
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
  const [value, setValue] = useState('');
  const { speak, cancel } = useSpeechSynthesis();


  //const cartInfo = useSelector((state) => state.cartInfo.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //select default in item 0;
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [search, setSearch] = useState('');
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowUp = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  useEffect(() => {
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

  // useEffect(() => {
  //   alanBtn({
  //     key: '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage',
  //     onCommand: (commandData) => {
  //       if (commandData.command === 'home_navigation') {
  //         // Call the client code that will react to the received command
  //         navigate('/');
  //       }
  //     }
  //   });
  // }, []);

  function EnterRoom(e) {
    navigate("/search")
  }

  function clickEvent() {

  }

  function addToTheCart(item) {
    //e.preventDefault()
    //console.log(`Add item with id ${id} to the cart`);
    console.log(`ITem info is: ${item.title}, ${item.text}, ${item.price}`)
    return dispatch(addToCart({
      title: item.title,
      text: item.text,
      price: item.price,
    }))
  }

  useEffect(() => {
    if (productsList.length && ArrowDown) {
      setCursor(prevState =>
        prevState < productsList.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [ArrowDown]);
  useEffect(() => {
    if (productsList.length && ArrowUp) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [ArrowUp]);
  useEffect((event) => {
    //const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
    cancel();
    const itemDetail = productsList[cursor];
    //console.log(JSON.stringify(itemDetail.title));
    // setText(prev => (prev = itemDetail.title))
    // setTitle(prev => (prev = itemDetail.title));
    // setPrice(prev => (prev = itemDetail.price))
    //console.log(`Item info are ${itemDetail.title}, ${itemDetail.text}, ${itemDetail.price}. Would you like to buy this product?`);
    //speak({ text: `Item info are ${itemDetail.title}, ${itemDetail.text}, ${itemDetail.price}. Would you like to buy this product?` })
    if (productsList.length && enterPress) {
      setSelected(cursor => productsList[cursor + 1]);
    }
    //console.log("Index is: " + itemDetail.text);
  }, [cursor]);
  useEffect(() => {
    if (productsList.length && hovered) {
      setCursor(productsList.indexOf(hovered));
      console.log("Index hovered: " + hovered);
    }
  }, [hovered]);

  function searchResult() {
    console.log(search)
    const filteredSearch = productsList.filter(product => {
      return product.name.indexOf(search.toLowerCase()) !== -1;
    })
    return filteredSearch;
  }

  return (
    <div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-success" onClick={() => searchResult()}>Search</Button>
      </Form>
      <Button onClick={(e) => { EnterRoom(e) }}>Click</Button>
      <span>Selected: {selected ? selected.title + selected.text + selected.price : "none"}</span>
      <Container>
        <Row>
          {/* {itemArray.map(item =>)} */}
          {
            productsList.map((item, index) => (
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
                addToTheCart={() => {
                  // dispatch(addToCart({
                  //   title: item.title,
                  //   text: item.text,
                  //   price: item.price,
                  // }))
                  addToTheCart(item);
                }}
              />
            )
            )
          }
        </Row>
      </Container>
    </div>
  );
}

export default HomePage2;