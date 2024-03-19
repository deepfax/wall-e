import { screen,render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ViewAllRecharges from "../component/ViewAllRecharges";
import axios from "axios";
import { renderWithProviders } from "./UserSlice-test";
import { useNavigate } from "react-router-dom";
// import { wait } from "@testing-library/user-event/dist/utils";

jest.mock('axios')
jest.mock('react-router-dom')
beforeAll(()=>
{
    sessionStorage.setItem('token','jwt-token')
    sessionStorage.setItem('email','johndoe@mail.com')

})
describe('get all recharges', () => { 
    it("component",()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        axios.post.mockResolvedValue({data:{
            "content": [
                {
                    "amount": 102,
                    "timeStamp": "2024-03-04T09:35:53.011Z"
                },
                {
                    "amount": 100,
                    "timeStamp": "2024-03-01T16:15:06.106Z"
                },
                {
                    "amount": 100,
                    "timeStamp": "2024-03-01T07:20:30.060Z"
                },
                {
                    "amount": 230,
                    "timeStamp": "2024-02-29T10:55:38.434Z"
                },
                {
                    "amount": 111,
                    "timeStamp": "2024-02-29T10:54:29.767Z"
                }
            ],
            "pageable": {
                "pageNumber": 0,
                "pageSize": 5,
                "sort": {
                    "sorted": false,
                    "empty": true,
                    "unsorted": true
                },
                "offset": 0,
                "paged": true,
                "unpaged": false
            },
            "last": false,
            "totalPages": 3,
            "totalElements": 15,
            "size": 5,
            "number": 0,
            "sort": {
                "sorted": false,
                "empty": true,
                "unsorted": true
            },
            "first": true,
            "numberOfElements": 5,
            "empty": false
            }})
        renderWithProviders(
            <>
                <ViewAllRecharges />
            </>
        )
    }),
    it("check for component",async()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        axios.post.mockResolvedValue({data:{
    "content": [
        {
            "amount": 102,
            "timeStamp": "2024-03-04T09:35:53.011Z"
        },
        {
            "amount": 100,
            "timeStamp": "2024-03-01T16:15:06.106Z"
        },
        {
            "amount": 100,
            "timeStamp": "2024-03-01T07:20:30.060Z"
        },
        {
            "amount": 230,
            "timeStamp": "2024-02-29T10:55:38.434Z"
        },
        {
            "amount": 111,
            "timeStamp": "2024-02-29T10:54:29.767Z"
        }
    ],
    "pageable": {
        "pageNumber": 0,
        "pageSize": 5,
        "sort": {
            "sorted": false,
            "empty": true,
            "unsorted": true
        },
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "last": false,
    "totalPages": 3,
    "totalElements": 15,
    "size": 5,
    "number": 0,
    "sort": {
        "sorted": false,
        "empty": true,
        "unsorted": true
    },
    "first": true,
    "numberOfElements": 5,
    "empty": false
    }})
    renderWithProviders(
        <>
            <ViewAllRecharges />
        </>
    )
    await waitFor(()=>
    {
        screen.getAllByTestId('test1')
    })
    })
    it("invalid case",async()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        axios.post.mockRejectedValue({response:{status:403}})
        renderWithProviders(
            <>
                <ViewAllRecharges />
            </>
        )


        await waitFor(()=>
        {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
    })
    it("invalid case",async()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        axios.post.mockRejectedValue({response:{status:400,data:{message:"invalid"}}})
        renderWithProviders(
            <>
                <ViewAllRecharges />
            </>
        )


        await waitFor(()=>
        {
            // expect(mockNavigate).toHaveBeenCalledWith('/login');
            screen.getByText("invalid")
        })
    })
 })