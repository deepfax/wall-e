import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import userSlice from "../redux-store/MailId";
import transactionSlice from "../redux-store/TransactionStore";
import RechargeSlice from "../redux-store/RechargeStore";
import barSlice from "../redux-store/BarDisplay";
import amountSlice from "../redux-store/AmountBalance";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { user: userSlice.reducer,transaction:transactionSlice.reducer,recharge:RechargeSlice.reducer,bar:barSlice.reducer,amount:amountSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}