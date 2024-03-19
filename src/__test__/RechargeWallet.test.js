import React from "react";
import { screen,render, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./UserSlice-test";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import RechargeWallet from "../component/RechargeWallet";
import { rechargeActions } from "../redux-store/RechargeStore";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import RechargeStatus from "../component/RechargeStatus";
import { useNavigate } from "react-router-dom";

jest.mock('axios')
jest.mock('react-router-dom')
describe("Recharge Wallet",()=>
{
    let ans=null
    it("recharge of document",async()=>
    {
        sessionStorage.setItem('email','johndoe@mail.com')
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const {store}=renderWithProviders(
            <>
                <RechargeWallet />
            </>
        )
        ans=store
        const reqData={
            email:"johndoe@mail.com",
            amount:20,
            password:"12345"
        }
        const resData={amount:20.0,
            timeStamp:"120223"}
            userEvent.keyboard(screen.getByPlaceholderText(/Amount/i),reqData.amount)
            userEvent.type(screen.getByPlaceholderText(/pin/i),reqData.password)
            
            axios.post.mockResolvedValue({status:200,data:resData})
        
        userEvent.click(screen.getByRole('button',{name:/recharge/i}))


            expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transaction/recharge-wallet",{amount:0,email:"johndoe@mail.com",password:'12345'},
            {headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }})
        await waitFor(()=>{
        store.dispatch(rechargeActions.setState({Status:"Recharge Successful",message:"Recharge was Successful",amount:resData.amount,timeStamp:resData.timeStamp}))
        const data=store.getState().transaction.Status
        
        expect(mockNavigate).toHaveBeenCalledWith('/recharge-status');}
        )
        // expect(screen.getByText(/Recharge Successful/i)).toBeInTheDocument()


    })

    it("continue test",()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const {store}=renderWithProviders(
            <>
                <RechargeStatus />
            </>
        )
        const resData={amount:20.0,
            timeStamp:"120223"}
        store.dispatch(rechargeActions.setState({Status:"Recharge Successful",message:"Recharge was Successful",amount:resData.amount,timeStamp:resData.timeStamp,email:'johndoe@mail.com'}))
        // const data=ans.getState().transaction
        // console.log(data)
        // expect(screen.getByText(/Recharge Successful/i)).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
        userEvent.click(screen.getByRole('button'))

        // expect(window.location.pathname).toBe('/');
    }),
    it("invalid user login",async()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const {store}=renderWithProviders(
            <>
                <RechargeWallet />
            </>
        )
        ans=store
        const reqData={
            email:"johndoe@mail.com",
            amount:20,
            password:"12345"
        }
        const resData={response:{status:403}}
            userEvent.keyboard(screen.getByPlaceholderText(/Amount/i),reqData.amount)
            userEvent.type(screen.getByPlaceholderText(/pin/i),reqData.password)
            
            axios.post.mockRejectedValue(resData)
        
        userEvent.click(screen.getByRole('button',{name:/recharge/i}))
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transaction/recharge-wallet",{amount:0,email:"johndoe@mail.com",password:'12345'},
        {headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }})
        // await waitFor(()=>{screen.getByRole('button',{name:/login/i})})
        await waitFor(()=>
        {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
    })
    it("invalid data",async()=>{
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const {store}=renderWithProviders(
            <>
            <RechargeStatus />
                <RechargeWallet />
            </>
        )
        ans=store
        const reqData={
            email:"johndoe@mail.com",
            amount:20,
            password:"12345"
        }
        const resData={response:{status:400,data:{message:'Unscessful',instant:'2024-02-29T10:55:38.434Z'}}}
            userEvent.keyboard(screen.getByPlaceholderText(/Amount/i),reqData.amount)
            userEvent.type(screen.getByPlaceholderText(/pin/i),reqData.password)
            
            axios.post.mockRejectedValue(resData)
        
        userEvent.click(screen.getByRole('button',{name:/recharge/i}))
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transaction/recharge-wallet",{amount:0,email:"johndoe@mail.com",password:'12345'},
        {headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }})

        store.dispatch(rechargeActions.setState({Status:"Recharge Unsuccessful",message:resData.response.data.message,email:reqData.email,amount:reqData.amount,timeStamp:resData.response.data.instant}))
        await waitFor(()=>
        {
            expect(mockNavigate).toHaveBeenCalledWith('/recharge-status');
            expect(screen.getByTestId('test1')).toBeInTheDocument()
            expect(screen.getByText(/Unsuccessful/i)).toBeInTheDocument()
        })
    })

  

})
