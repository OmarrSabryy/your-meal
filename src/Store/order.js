import { createSlice } from "@reduxjs/toolkit";
const initialOrderState = {
  order: {},
  orderChecked: false,
  orderDelivered: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    AddOrder(state, action) {
      state.order = action.payload;
    },
    toggleCheck(state) {
      state.orderChecked = !state.orderChecked;
    },
    toggleDeliver(state) {
      state.orderDelivered = !state.orderDelivered;
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
