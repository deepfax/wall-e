import { createSlice } from "@reduxjs/toolkit";

const userData={firstName:'',lastName:'',email:'',phoneNo:''}
const userSlice=createSlice(
    {
        name:'user',
        initialState:userData,
        reducers:
        {
            setItem(state,action)
            {
                state.firstName=action.payload.firstName
                state.lastName=action.payload.lastName
                state.email=action.payload.email
                state.phoneNo=action.payload.phoneNo
            },
            resetItem(state,account)
            {
                state.email=''
                state.firstName=''
                state.lastName=''
                state.phoneNo=''
            }
        }
    }
)

export const userActions=userSlice.actions
export default userSlice