import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./MailId";
import transactionSlice from "./TransactionStore";
import RechargeSlice from "./RechargeStore";
import barSlice from "./BarDisplay";
import amountSlice from "./AmountBalance";

const store=configureStore(
    {
        reducer:{user:userSlice.reducer,transaction:transactionSlice.reducer,recharge:RechargeSlice.reducer,bar:barSlice.reducer,amount:amountSlice.reducer}
    }
)
export default store