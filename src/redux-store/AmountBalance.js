import { createSlice } from "@reduxjs/toolkit"

const initialState={amount:0.0}
const amountSlice=createSlice({
    name:'amount',
    initialState,
    reducers:{
        setAmounts(state,action)
        {
            state.amount=action.payload.amount
        },
        resetAmount(state,action)
        {
            state.amount=0.0
        }
    }
})

export const amountActions=amountSlice.actions
export default amountSlice