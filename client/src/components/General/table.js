import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";

function TableLayout(props) {
  const deleteItem = useSelector((state) => state.cartInfo.value);
  //const img = props.img;
  const title = props.title;
  const text = props.text;
  const addToTheCart = props.addToTheCart;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item name</th>
            <th>Item title</th>
            <th>Item description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default TableLayout;