import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart"
import Slider from "./components/Slider";
import Success from "./pages/Success";
import Pay from "./pages/Pay";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  // useSelector((state)=>state.user.currentUser)
  return (
    <Router>
      <Switch>
        <Route exact path ="/">
          <Home/>
        </Route>
        <Route path ="/products/:category">
          <ProductList/>
        </Route>
        <Route path ="/product/:id">
          <Product/>
        </Route>
        <Route path ="/cart">
          <Cart/>
        </Route>
        <Route path ="/pay">
          <Pay />
        </Route>
        <Route path ="/success">
          <Success />
        </Route>

        <Route path ="/login">
        {user ? <Redirect to="/"/> :<Login/> }
         
        </Route>

        <Route path ="/register">
          {user ? <Redirect to="/"/> : <Register/>}
        </Route>

      </Switch>
    </Router>
  )
};

export default App;