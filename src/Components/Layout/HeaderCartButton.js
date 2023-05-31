import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);
  const [highlighted, setHighlighted] = useState(false);
  useEffect(() => {
    if (items.length === 0) return;
    setHighlighted(true);
    const timer = setTimeout(() => {
      setHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button
      onClick={props.onClick}
      className={`${styles["cart-button"]} ${highlighted ? styles.bump : ""}`}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.text}>Your Cart</span>
      <span className={styles.items}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
