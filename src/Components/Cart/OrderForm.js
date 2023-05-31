import {
  useContext,
  // useState,
  // , useEffect
} from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../Store/order";
import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
import styles from "./OrderForm.module.css";
import CartContext from "../../Store/cart-context";
function OrderForm(props) {
  // const [orders, setOrders] = useState([]);
  const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();
  const isDelivered = useSelector((state) => state.order.orderDelivered);
  const isChecked = useSelector((state) => state.order.orderChecked);
  const nameCheck = (value) => value.trim() !== "";
  const emailCheck = (value) => nameCheck(value) && value.includes("@");
  // const fetchOrders = async () => {
  //   const response = await fetch(
  //     "https://orderfood-db414-default-rtdb.firebaseio.com/orders.json"
  //   );
  //   const data = await response.json();
  //   let fetchedOrders = [];
  //   for (const key in data) {
  //     fetchedOrders.push({
  //       orderID: key,
  //       name: data[key].name,
  //       email: data[key].email,
  //       order: data[key].order,
  //       totalAmount: data[key].totalAmount,
  //     });
  //     setOrders(fetchedOrders);
  //   }
  // };
  const {
    value: enteredFirstName,
    valueIsValid: firstNameIsvalid,
    hasError: firstNameNotValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(nameCheck);

  const {
    value: enteredLastName,
    valueIsValid: lastNameIsvalid,
    hasError: lastNameNotValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(nameCheck);

  const {
    value: enteredEmail,
    valueIsValid: emailIsvalid,
    hasError: emailNotValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailCheck);

  let formIsvalid = false;
  if (firstNameIsvalid && lastNameIsvalid && emailIsvalid) formIsvalid = true;
  const confirmOrderFormHandler = async (event) => {
    event.preventDefault();
    if (!formIsvalid) return;
    props.onConfirm();
    cartCtx.resetCart();

    let order = {
      name: enteredFirstName + enteredLastName,
      email: enteredEmail,
      order: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    };
    if (isDelivered) dispatch(orderActions.toggleDeliver());
    if (isChecked) dispatch(orderActions.toggleCheck());
    dispatch(orderActions.AddOrder(order));
    // setOrders(order);
    // props.onAddOrder(order);
    // const orderExists = orders.find((item) => item.name === order.name);
    // let newOrder = [];

    // if (orderExists) {
    //   const {
    //     orderID,
    //     order: oldOrder,
    //     totalAmount: oldTotalAmount,
    //   } = orderExists;
    //   newOrder = oldOrder.concat(cartCtx.items);
    //   const newTotalAmount = oldTotalAmount + cartCtx.totalAmount;
    //   const response = await fetch(
    //     `https://orderfood-db414-default-rtdb.firebaseio.com/orders/${orderID}.json`,
    //     {
    //       method: "PATCH",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         order: newOrder,
    //         totalAmount: newTotalAmount,
    //       }),
    //     }
    //   );
    //   const data = await response.json();
    //   console.log(data);
    // } else {
    //   const response = await fetch(
    //     "https://orderfood-db414-default-rtdb.firebaseio.com/orders.json",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(order),
    //     }
    //   );
    //   const data = await response.json();
    //   const orderID = data.name;
    //   const orderResponse = await fetch(
    //     `https://orderfood-db414-default-rtdb.firebaseio.com/orders/${orderID}.json`
    //   );
    //   const orderData = await orderResponse.json();
    //   console.log(orderData);
    //   const newOrder = {
    //     orderID: orderID,
    //     name: orderData.name,
    //     email: orderData.email,
    //     order: orderData.order,
    //     totalAmount: orderData.totalAmount,
    //   };
    //   setOrders((prevOrders) => prevOrders.push(newOrder));
    // }
  };
  // useEffect(() => {
  //   fetchOrders();
  // }, []);
  return (
    <Modal>
      <form onSubmit={confirmOrderFormHandler} className={styles["order-Form"]}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
        />
        {firstNameNotValid && (
          <p style={{ color: "red" }}>first name must not be empty.</p>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
        />
        {lastNameNotValid && (
          <p style={{ color: "red" }}>last name must not be empty.</p>
        )}
        <label htmlFor="emailAddress">E-mail Address</label>
        <input
          type="text"
          id="emailAddress"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailNotValid && (
          <p style={{ color: "red" }}>please enter a vail e-mail.</p>
        )}
        <button>Confirm Order</button>
      </form>
    </Modal>
  );
}
export default OrderForm;
