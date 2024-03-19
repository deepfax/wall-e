import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoaderFIle from "../component/LoaderFIle";

test("test for loader",()=>
{
    render(
        <MemoryRouter>
            <LoaderFIle />
        </MemoryRouter>
    )
})