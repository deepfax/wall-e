import { createSlice } from "@reduxjs/toolkit";

const barSlice=createSlice({
    name:'bar',
    initialState:{bar:true},
    reducers:
    {
        toggle(state,action)
        {
            state.bar=!state.bar
        }
    }
})

export const barActions=barSlice.actions
export default barSlice