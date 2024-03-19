import { screen,render, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./UserSlice-test";
import { MemoryRouter } from "react-router-dom";
import SendAmount from "../component/SendAmount";
import { useEffect, useReducer } from "react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { transactionActions } from "../redux-store/TransactionStore";
import TransactionStatus from "../component/TransactionStatus";
import AlertPage from "../component/AlertPage";
import { act } from "react-test-renderer";
// import { mockComponent } from "react-dom/test-utils";

jest.mock('axios')
// jest.mock('react-router-dom');
const mockFn = jest.fn();
beforeAll(()=>
{
    sessionStorage.setItem('token','jwt-token')
    sessionStorage.setItem('email','johndoe@mail.com')

})
afterEach(()=>
{
    mockFn.mockClear()
})
describe("Send amount Test",()=>
{
    it("component renders correctly",()=>
    {
        const {store}=renderWithProviders(
            <MemoryRouter>
                <SendAmount/>
            </MemoryRouter>
        )


    }),
    it("test for component working",async()=>
    {
        const mockedUsedNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockedUsedNavigate,
            }));

        const {store}=renderWithProviders(
            <MemoryRouter>
                <TransactionStatus />
                <SendAmount/>
            </MemoryRouter>
        )
        const amount=200
        axios.post.mockResolvedValue({data:true})
        expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText(/email/i),"deepak@mail.com")
        userEvent.type(screen.getByPlaceholderText(/amount/i),amount.toString())
        userEvent.type(screen.getByPlaceholderText(/description/i),"test")
        const checkaAmount={
            email:"johndoe@mail.com",
            amount:"0200"
        }
        
        fireEvent.click(screen.getByRole('button',{name:/pay/i}))

            expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/account/check-amount",checkaAmount,{
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        // console.debug()
        await waitFor(()=>{expect(screen.getByPlaceholderText("Pin")).toBeInTheDocument()})
        userEvent.type(screen.getByPlaceholderText("Pin"),"12345")
        const data={
            senderMail:"johndoe@mail.com",
            receiverMail:"deepak@mail.com",
            amount:checkaAmount.amount,
            description:"test",
            accPassword:"12345"
        }        
        axios.post.mockResolvedValue({data:{ senderMail:"johndoe@mail.com",
        receiverMail:"deepak@mail.com",
        amount:checkaAmount.amount,
        description:"test"}})
        
        fireEvent.click(screen.getByRole('button',{name:/send amount/i}))
        
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transaction/create",data,{
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        store.dispatch(transactionActions.setState({Status:'Successful',message:'Transaction was Successful',senderMail:'johndoe@mail.com',receiverMail:'deepak@mail.com',amount:checkaAmount.amount,description:data.description}))
        mockedUsedNavigate.mockReturnValue("/transaction-status")
        await waitFor(()=>{expect(screen.getByText(/successful/i)).toBeInTheDocument()
        expect(screen.getByText(/sender/i)).toBeInTheDocument()
        expect(screen.getByText(/home/i)).toBeInTheDocument()
        expect(screen.getByRole('button',{name:'To Home'}))

        
    })
    mockedUsedNavigate.mockReturnValue("/")
    userEvent.click(screen.getByRole('button',{name:'To Home'}))
    expect(window.location.pathname).toBe('/');
    }),
    it("invalid transaction",async()=>
    {
        const mockedUsedNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockedUsedNavigate,
            }));

        const {store}=renderWithProviders(
            <MemoryRouter>
                <AlertPage />
                <SendAmount/>
            </MemoryRouter>
        )
        const amount=200
        axios.post.mockResolvedValue({data:false})
        expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText(/email/i),"deepak@mail.com")
        userEvent.type(screen.getByPlaceholderText(/amount/i),amount.toString())
        userEvent.type(screen.getByPlaceholderText(/description/i),"test")
        const checkaAmount={
            email:"johndoe@mail.com",
            amount:"0200"
        }
        
        fireEvent.click(screen.getByRole('button',{name:/pay/i}))

            expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/account/check-amount",checkaAmount,{
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        await waitFor(()=>{
            expect(screen.getByText(/Insufficient Balance/i)).toBeInTheDocument()
        })            
    })
})