import { Card, Button } from 'react-bootstrap'

function ShoppingCard(props) {
  const img = props.img;
  const title = props.title;
  const text = props.text;
  const addToTheCart = props.addToTheCart;
  // function addToTheCart() {
  //   console.log("Add item" + title + "to the cart");
  // }
  return (
    <>
      <Card style={{ width: '20rem', height: '25rem' }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <Button variant="primary" onClick={addToTheCart}>Add to the cart</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default ShoppingCard;