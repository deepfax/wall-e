import {screen,render, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./UserSlice-test";
import { MemoryRouter } from "react-router-dom";
import GetTransactions from "../component/GetTransactions";
import axios from "axios";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import AlertPage from "../component/AlertPage";
jest.mock('axios')
beforeAll(()=>
{
    sessionStorage.setItem('token','jwt-token')
    sessionStorage.setItem('email','ANILKUMAR@MAIL.COM')
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUsedNavigate,
        }));
    // const data={data:"heello"}
})
describe("transactions page",()=>
{
    test("render correctly",async()=>
    {
        axios.post.mockResolvedValue({data:{
            totalElements:10,
            content:[
            {
                "id": "65e1fdb7eac7321711f50fa8",
                "senderMailId": "ANILKUMAR@MAIL.COM",
                "receiverMailId": "DEEPAK@MAIL.COM",
                "amountSent": 10,
                "timeStamp": "2024-03-01T16:09:27.116Z",
                "description": "sdsad"
            },
            {
                "id": "65e1e4ffeac7321711f50fa7",
                "senderMailId": "ANILKUMAR@MAIL.COM",
                "receiverMailId": "DEEPAK@MAIL.COM",
                "amountSent": 100,
                "timeStamp": "2024-03-01T14:23:59.752Z",
                "description": "hanuman"
            },
            {
                "id": "65e19c436aa35b3bdeb37d34",
                "senderMailId": "ANILKUMAR@MAIL.COM",
                "receiverMailId": "DEEPAK@MAIL.COM",
                "amountSent": 100,
                "timeStamp": "2024-03-01T09:13:39.200Z",
                "description": "shiva"
            },
            {
                "id": "65e0e2628ff66f46c4fbd240",
                "receiverMailId": "ANILKUMAR@MAIL.COM",
                "senderMailId": "DEEPAK@MAIL.COM",
                "amountSent": 10,
                "timeStamp": "2024-02-29T20:00:34.193Z",
                "description": "shiva"
            }
        ]}})
        renderWithProviders(
            <MemoryRouter>
                <GetTransactions />
            </MemoryRouter>
        )
        const pageStatus={
            senderEmail:"deepak@mail.com",
            currPage:1,
            pageSize:4
        }
        const userMail=sessionStorage.getItem('email')
        expect(screen.getByRole('button',{name:'Search'})).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText("MailId"),"deepak@mail.com")
        userEvent.click(screen.getByRole('button',{name:'Search'}))


        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transactions/get-transactions",{receiverEmail:pageStatus.senderEmail,senderEmail:userMail,currPage:pageStatus.currPage-1,pageSize:pageStatus.pageSize},{
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        await waitFor(()=>
        {
            screen.getAllByTestId('test')
            screen.getByTestId('tests1')
            // screen.getByTestId('tests3')

        })
        axios.post.mockResolvedValue({data:{
            totalElements:10,
            content:[
                {
                    "id": "65e1fdb7eac7321711f50fa8",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "DEEPAK@MAIL.COM",
                    "amountSent": 10,
                    "timeStamp": "2024-03-01T16:09:27.116Z",
                    "description": "sdsad"
                },
                {
                    "id": "65e1e4ffeac7321711f50fa7",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "DEEPAK@MAIL.COM",
                    "amountSent": 100,
                    "timeStamp": "2024-03-01T14:23:59.752Z",
                    "description": "hanuman"
                },
                {
                    "id": "65e19c436aa35b3bdeb37d34",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "DEEPAK@MAIL.COM",
                    "amountSent": 100,
                    "timeStamp": "2024-03-01T09:13:39.200Z",
                    "description": "shiva"
                },
                {
                    "id": "65e0e2628ff66f46c4fbd240",
                "receiverMailId": "ANILKUMAR@MAIL.COM",
                "senderMailId": "DEEPAK@MAIL.COM",
                "amountSent": 10,
                "timeStamp": "2024-02-29T20:00:34.193Z",
                "description": "shiva"
            }
        ]}})
        

    }),
    it("renders properly",async()=>
    {
       
        // const setIsloading = jest.fn();
        // jest.spyOn(React, 'useState').mockReturnValue([false, setIsloading]);
        renderWithProviders(
            <MemoryRouter>
                <GetTransactions />
            </MemoryRouter>
        )
       

      
       
        // await waitFor(()=>{expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/transactions/get-transactions",{receiverEmail:pageStatus.senderEmail,senderEmail:userMail,currPage:pageStatus.currPage-1,pageSize:pageStatus.pageSize},{
        //     headers:{
        //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        //     }
        // })})
    
       

    })
    it("invalid request",async()=>
    {
        renderWithProviders(
            <MemoryRouter>
                <AlertPage/>
                <GetTransactions />
            </MemoryRouter>
        )
        axios.post.mockRejectedValue({response:{data:{message:'invalid'}}})
        const userMail=sessionStorage.getItem('email')
        expect(screen.getByRole('button',{name:'Search'})).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText("MailId"),"deepak@mail.com")
        userEvent.click(screen.getByRole('button',{name:'Search'}))

        await waitFor(()=>{
            screen.getByText('invalid')
        })


    })
})