import { screen } from "@testing-library/react";
import { renderWithProviders } from "./UserSlice-test";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomePage from "../component/HomePage";

jest.mock('react-router-dom')
jest.mock('axios')
beforeAll(()=>
{
    sessionStorage.setItem('token','jwt-token')
    sessionStorage.setItem('email','johndoe@mail.com')

})
test("invalid home test",async()=>
    {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        // const mail=sessionStorage.getItem('mail')
        axios.get.mockRejectedValue({ response: { status:403 }});
        
        

        renderWithProviders(
            <HomePage />
            )

        //     expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/get-details/deeopswe@.ds`,{
        //     headers:{
        //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        //     }
        // })
        // await waitFor(()=>
        // {
            // screen.getByTestId('test12')
            // expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
