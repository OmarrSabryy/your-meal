import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../Store/order";
import { useSelector } from "react-redux";
import MealsImg from "../../Assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { MdDeliveryDining } from "react-icons/md";
import { GiCookingGlove } from "react-icons/gi";
import Modal from "../UI/Modal";
// import CartContext from "../../Store/cart-context";

const Header = (props) => {
  const [showOrder, setShowOrder] = useState(false);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const isDelivered = useSelector((state) => state.order.orderDelivered);
  const isChecked = useSelector((state) => state.order.orderChecked);
  const orderCheckHandler = () => {
    setShowOrder((prev) => !prev);
  };
  // const cartCtx = useContext(CartContext);
  // const numberOfCartItems = cartCtx.items.reduce((cur, item) => {
  //   return cur + item.amount;
  // });
  return (
    <React.Fragment>
      <header>
        <h1>Your Meals</h1>
        <div>
          {order.name && !isDelivered && (
            <MdDeliveryDining
              size={20}
              cursor="pointer"
              className={`${isChecked ? "" : "rotate-45-ccw"}`}
              onClick={orderCheckHandler}
            />
          )}
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
      <div className={styles.mainImg}>
        <img src={MealsImg} alt="food-img" />
      </div>
      {showOrder && (
        <Modal>
          <div className={styles.modal}>
            <div className={styles["modal-head"]}>
              {isChecked ? (
                <>
                  <h1>Your order is on the way</h1>
                  <MdDeliveryDining size={22} className="slide-right" />
                </>
              ) : (
                <>
                  <h1>Your order is getting ready</h1>
                  <GiCookingGlove size={20} className="rotate-45-ccw" />
                </>
              )}
            </div>
            {!isChecked && (
              <>
                <h2>Order Name:</h2>
                <h3>{order.name}</h3>
                <h2>Total Amount:</h2>
                <h3>${order.totalAmount}</h3>
              </>
            )}
            <button
              onClick={() => {
                setShowOrder((prev) => !prev);
                if (!isChecked) dispatch(orderActions.toggleCheck());
                if (isChecked) dispatch(orderActions.toggleDeliver());
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};
export default Header;
