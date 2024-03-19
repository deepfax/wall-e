import { screen,render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { renderWithProviders } from "./UserSlice-test";
beforeAll(()=>
{
    sessionStorage.setItem('token','jwt-token')
    sessionStorage.setItem('email','johndoe@mail.com')

})
test("test for app",()=>{
    renderWithProviders(
        <MemoryRouter>
            <App/>
        </MemoryRouter>
    )
})