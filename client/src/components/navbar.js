import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLoginInfo } from "../redux/loginInfo";
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';


function IsLoggedIn() {
  //const loginForm = useSelector((state) => state.loginInfo.value);
  // const loginForm = useSelector((state) => state.loginInfo.value);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // if (loginForm !== "") {
  //   return (
  //     <div>
  //       <Link to={"/profile/".concat(loginForm.id)}>Hello user {loginForm.username} </Link>
  //       <div onClick={() => { console.log("Logout"); dispatch(getLoginInfo("")); navigate("/") }}>Logout </div>
  //       {/* dispatch(logOut()) */}
  //     </div>
  //   )
  // }
  // return (
  //   <>
  //     <Link to="/login"
  //       class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
  //       Login</Link>
  //     {/* <p>{loginForm.username}</p> */}
  //     <Link to="/register"
  //       class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
  //       Register</Link>
  //   </>
  // )
}

function navbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/about">About us</Link></Nav.Link>
            <Nav.Link><Link to="/cart">Cart</Link></Nav.Link>
            <Nav.Link><Link to="/login">Sign in</Link></Nav.Link>
            <Nav.Link><Link to="/register">Sign up</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar;