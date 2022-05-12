import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../redux/cart'
import { useSpeechSynthesis } from "react-speech-kit";

function CartPage() {
  const cartInfo = useSelector((state) => state.cartInfo.items);
  const total_price = useSelector((state) => state.cartInfo.total_price);
  const dispatch = useDispatch();
  //const deleteItem = useSelector((state) => state.cartInfo.value);
  if (total_price === 0) {
    return (
      <h1>You haven't buy anything yet! Go buy something!</h1>
    )
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item name</th>
            <th>Item title</th>
            <th>Item description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            cartInfo.map((item, index) => (
              <tr>
                <td>{index}</td>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td>{item.price}</td>
                <td><Button className="btn btn-danger" onClick={() => dispatch(removeFromCart({
                  index: index,
                  price: item.price
                }))}>Delete</Button></td>
              </tr>
            )
            )
          }
        </tbody>
      </Table>
      <h1>Total price: {total_price.toString()}</h1>
    </>
  )
}

export default CartPage;