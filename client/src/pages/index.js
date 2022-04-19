// import Home from './HomePage'
// import About from './AboutPage'
// import Login from './LoginPage'
// import Register from './RegisterPage'

// export { Home, About, Login, Register };
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useHistory } from 'react-router-dom';

function PageNavigation(name) {
  const navigate = useNavigate();
  return navigate(name);
}

export default PageNavigation;