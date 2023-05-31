import { useReducer } from "react";
import CartContext from "./cart-context";
const cartDefault = { items: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const itemExists = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // console.log(itemExists);
    const existingItem = state.items[itemExists];
    // console.log(existingItem);
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      // console.log(updatedItem);
      updatedItems = [...state.items];
      updatedItems[itemExists] = updatedItem;
      // console.log(updatedItems[existingItem]);
      // console.log(updatedItems);
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const targetItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const targetItem = state.items[targetItemIndex];
    const updatedTotalAmount = state.totalAmount - targetItem.price;
    let updatedItems;
    if (targetItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== targetItem.id);
    } else {
      const updatedItem = { ...targetItem, amount: targetItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[targetItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "RESET") return cartDefault;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, cartDefault);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const resetCart = () => {
    dispatchCartAction({ type: "RESET" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
