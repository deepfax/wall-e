// import { AccountBalance } from "@mui/icons-material";
import { screen,render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountBalance from "../component/AccountBalance";
import React from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { renderWithProviders } from "./UserSlice-test";
import { amountActions } from "../redux-store/AmountBalance";
// import { wait } from "@testing-library/user-event/dist/utils";


jest.mock('axios')
beforeAll(()=>
{
    sessionStorage.setItem('email','johndoe@mail.com')
    sessionStorage.setItem('token','new token')
})
describe("Account Balance",()=>{
    it("Display Account Balance",async()=>
    {
        axios.get.mockResolvedValue({status:200,data:20.0})
        // jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
        const mailId=sessionStorage.getItem('email')
          
        
       const {store}=renderWithProviders(
            <MemoryRouter>
                <AccountBalance />
            </MemoryRouter>
        )
        store.dispatch(amountActions.setAmounts({amount:20.0}))
            expect(screen.getByText("The Account Balance is:")).toBeInTheDocument()
            expect(screen.getByRole('button')).toBeInTheDocument()
            // expect(screen.getByText(20)).toBeInTheDocument()
            const element=screen.getByTestId('test')

            
            await waitFor(()=>{expect(element.textContent).toBe("20")})
        

            // expect(getByText(0)).toBeInTheDocument()

        
        fireEvent.click((screen.getByRole('button')))
        expect(window.location.pathname).toBe('/');

    })
})