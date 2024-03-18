import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import Products from './component/Products';
import Register from './component/Register';
import Login from './component/Login';
import Cart from './component/Cart';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/Login" Component={Login} />
        <Route exact path="/cart" Component={Cart} />
      </Routes>
    </>
  );
}

export default App;