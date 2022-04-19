//import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import Footer from './components/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './router/route'
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {
            routes.map((route) => {
              return (
                <Fragment>
                  <Route path={route.path} element={route.component}></Route>
                </Fragment>
              );
            })
          }
        </Routes>
        {/* <RouterView /> */}
        <Footer />
      </div>
    </Router >
  );
}

export default App;
