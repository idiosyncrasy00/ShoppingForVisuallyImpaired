//import { Home, About, Login, Register } from '../pages/index';
import Home2 from '../pages/HomePage2'
import About from '../pages/AboutPage'
import Login from '../pages/LoginPage'
import Register from '../pages/RegisterPage'
import Profile from '../pages/ProfilePage'
import SearchPage from '../pages/SearchPage'
import RoomPage from '../pages/RoomPage'
import NotFound from '../pages/404NotFound'

const routes = [
  {
    path: '/',
    component: <Home2 />,
  },
  {
    path: '/about',
    component: <About />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/register',
    component: <Register />,
  },
  {
    path: '/profile/:id',
    component: <Profile />,
  },
  {
    path: '/search',
    component: <SearchPage />,
  },
  {
    path: '/search?query=:query',
    component: <SearchPage />,
  },
  {
    path: '/room/:id',
    component: <RoomPage />,
  },
  {
    path: '*',
    component: <NotFound />,
  }
];

export default routes;