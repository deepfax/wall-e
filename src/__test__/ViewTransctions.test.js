import { screen,render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaginatedTable from "../component/ViewTransactions";
import axios from "axios";
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
describe.only("view transaction",()=>
{
    it("render component",async()=>
    {
        axios.post.mockResolvedValue({data:{
            "content": [
                {
                    "id": "65e6e22d62864203d718caa3",
                    "receiverMailId": "ANILKUMAR@MAIL.COM",
                    "senderMailId": "DEEPAK@MAIL.COM",
                    "amountSent": 4,
                    "timeStamp": "2024-03-05T09:13:17.634Z",
                    "description": "sadf"
                },
                {
                    "id": "65e595e062864203d718caa0",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "DEEPAK@MAIL.COM",
                    "amountSent": 120,
                    "timeStamp": "2024-03-04T09:35:28.101Z",
                    "description": "dfd"
                },
                {
                    "id": "65e37e21eac7321711f50fb1",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "SHIVAKUMAR@MAIL.COM",
                    "amountSent": 30,
                    "timeStamp": "2024-03-02T19:29:37.586Z",
                    "description": "sdsdf"
                },
                {
                    "id": "65e37a6deac7321711f50fb0",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "SHIVAKUMAR@MAIL.COM",
                    "amountSent": 10,
                    "timeStamp": "2024-03-02T19:13:49.683Z",
                    "description": "dfsf"
                },
                {
                    "id": "65e37a6ceac7321711f50faf",
                    "senderMailId": "ANILKUMAR@MAIL.COM",
                    "receiverMailId": "SHIVAKUMAR@MAIL.COM",
                    "amountSent": 100,
                    "timeStamp": "2024-03-02T19:13:48.771Z",
                    "description": "edfsd"
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
            "totalPages": 13,
            "totalElements": 62,
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
        render(
            <MemoryRouter>
                <PaginatedTable />
            </MemoryRouter>
        )

        await waitFor(()=>
        {
            screen.getAllByTestId("test")
        })
        
    })
    it("check for empty list",async()=>
    {
        axios.post.mockRejectedValue({response:{status:400}})
        render(
            <MemoryRouter>
                <PaginatedTable />
            </MemoryRouter>
        )
        await waitFor(()=>
        {
            screen.getByText(/No Transaction/i)
        })
    })
    
})