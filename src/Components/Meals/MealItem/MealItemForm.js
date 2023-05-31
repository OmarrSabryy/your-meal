import { useRef, useState } from "react";
import Input from "../../UI/Input";
import "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [amountIsvalid, setAmountIsvalid] = useState(true);
  const mealAmount = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = mealAmount.current.value;
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsvalid(false);
      return;
    }
    props.onAddToCart(enteredAmount);
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        ref={mealAmount}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsvalid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
