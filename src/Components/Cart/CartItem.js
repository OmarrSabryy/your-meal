import styles from "./CartItem.module.css";
const CartItem = (props) => {
  return (
    <li className={styles.cartItem}>
      <div className={styles["cartItem__description"]}>
        <h2>{props.name}</h2>
        <div className={styles.cartItem__description__controls}>
          <span>{`$${props.price.toFixed(2)}`}</span>
          <span>{`x${props.amount}`}</span>
        </div>
      </div>
      <div className={styles.cartItem__controls}>
        <button onClick={props.onRemoveItem}>-</button>
        <button onClick={props.onAddItem}>+</button>
      </div>
    </li>
  );
};
export default CartItem;
