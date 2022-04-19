//import { Home, About, Login, Register } from '../pages/index';
import Home from '../pages/HomePage'
import Login from '../pages/LoginPage'
import Register from '../pages/RegisterPage'
import Profile from '../pages/ProfilePage'
import SearchPage from '../pages/SearchPage'
import NotFound from '../pages/404NotFound'

const routes = [
  {
    path: '/',
    component: <Home />,
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
    path: '*',
    component: <NotFound />,
  }
];

export default routes;