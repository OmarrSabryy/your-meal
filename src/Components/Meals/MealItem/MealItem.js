import { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: +amount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={styles["meal-item"]}>
      <div className={styles.meal}>
        <h3>{props.name}</h3>
        <div className={styles["meal-description"]}>{props.description}</div>
        <div className={styles["meal-price"]}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
