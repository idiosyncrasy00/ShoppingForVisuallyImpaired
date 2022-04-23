import { Card, Button } from 'react-bootstrap'
import './style.css'

function ShoppingCard(props) {
  const img = props.img;
  const title = props.title;
  const text = props.text;
  const addToTheCart = props.addToTheCart;
  const index = props.index;

  //hovered, selected
  const setSelected = props.setSelected;
  const setHovered = props.setHovered;
  const item = props.item;
  const active = props.active;
  return (
    <Card
      className={`item ${active ? "active" : ""}`}
      onClick={() => setSelected(item)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
      style={{ width: '20rem', height: '20rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title} - index: {index}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        {/* <Button variant="primary" onClick={addToTheCart}>Add to the cart</Button> */}
      </Card.Body>
    </Card>
  )
}

export default ShoppingCard;