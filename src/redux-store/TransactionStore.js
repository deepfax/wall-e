import { createSlice } from "@reduxjs/toolkit";

const initialState={Status:'',message:'',senderMail:'',receiverMail:'',amount:0.0,description:'',timestamp:''}
const transactionSlice=createSlice(
    {
        name:'transaction',
        initialState,
        reducers:{
            setState(state,action)
            {
                state.Status=action.payload.Status
                state.message=action.payload.message
                state.senderMail=action.payload.senderMail
                state.receiverMail=action.payload.receiverMail
                state.amount=action.payload.amount
                state.description=action.payload.description
                state.timestamp=action.payload.timestamp
            },
            deleteState(state,action)
            {
                state.Status=''
                state.message=''
                state.senderMail=''
                state.amount=0.0
                state.description=''
                state.timestamp=''
            }
        }
    }
)

export const transactionActions=transactionSlice.actions
export default transactionSlice