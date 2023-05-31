import { useContext, Fragment } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const submitOrderHandler = () => {
    props.onOrder();
    props.onClose();
  };
  const cartItems = (
    <ul className={styles.itemList}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAddItem={addCartItemHandler.bind(null, item)}
          onRemoveItem={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Fragment>
      <Modal>
        <div className={styles.cart}>
          {cartItems}
          <div className={styles["cart-total"]}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={styles["cart-actions"]}>
            <button
              onClick={props.onClose}
              className={styles["cart-actions__close"]}
            >
              Close
            </button>
            {hasItems && (
              <button
                className={styles["cart-actions__order"]}
                onClick={submitOrderHandler}
              >
                Order
              </button>
            )}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export default Cart;
