import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

const initialState={Status:'',message:'',email:'',amount:0.0,timestamp:''}
const RechargeSlice=createSlice(
    {
        name:'recharge',
        initialState,
        reducers:{
            setState(state,action)
            {
                state.Status=action.payload.Status
                state.message=action.payload.message
                state.email=action.payload.email
                state.amount=action.payload.amount
                state.timestamp=action.payload.timeStamp
            },
            deletState(state,action)
            {
                state.Status=''
                state.message=''
                state.email=''
                state.amount=''
                state.timestamp=''
            }
        }
    }
)

export const rechargeActions=RechargeSlice.actions
export default RechargeSlice