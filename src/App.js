import "./App.css";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Store/CartProvider";
import OrderForm from "./Components/Cart/OrderForm";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const addOrderHandler = (order) => setOrders(order);
  const showCartHandler = () => {
    if (showCart) setShowCart(false);
    else setShowCart(true);
  };
  const showOrderFormHandler = () => {
    if (showOrderForm) {
      setShowOrderForm(false);
      // setShowCart(true);
    } else setShowOrderForm(true);
  };
  return (
    <div className="container">
      <CartProvider>
        <Header onShowCart={showCartHandler} order={orders} delivered={false} />
        {showCart && (
          <Cart onClose={showCartHandler} onOrder={showOrderFormHandler} />
        )}
        {showOrderForm && (
          <OrderForm
            onConfirm={showOrderFormHandler}
            onAddOrder={addOrderHandler}
          />
        )}
        <main className="container">
          <Meals />
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
