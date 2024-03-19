import {screen,render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBarComp from "../component/SideBarComp";
import userEvent from "@testing-library/user-event";


describe("test for sidebar",()=>
{
    it("check of rendering",()=>
    {
        render(
            <MemoryRouter>
                <SideBarComp />
            </MemoryRouter>
        )
        expect(screen.getByText(/Home/i)).toBeInTheDocument()
    })
})