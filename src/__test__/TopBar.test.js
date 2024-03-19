import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "./UserSlice-test";
import { MemoryRouter, useActionData } from "react-router-dom";
import ButtonAppBar from "../component/TopBar";
import { userActions } from "../redux-store/MailId";
import { transactionActions } from "../redux-store/TransactionStore";
import { rechargeActions } from "../redux-store/RechargeStore";
import userEvent from "@testing-library/user-event";
import LoginPage from "../component/LoginPage";
import { amountActions } from "../redux-store/AmountBalance";
import SideBarComp from "../component/SideBarComp";
import { barActions } from "../redux-store/BarDisplay";

describe("check",()=>
{
    it("check for top bar",()=>
    {
        const {store}=renderWithProviders(
            <MemoryRouter>
                <LoginPage />
                <ButtonAppBar />
            </MemoryRouter>
        )

        expect(screen.getByRole('button',{name:/logout/i})).toBeInTheDocument()

        userEvent.click(screen.getByRole('button',{name:/logout/i}))
        store.dispatch(userActions.resetItem())
        store.dispatch(transactionActions.deleteState())
        store.dispatch(rechargeActions.deletState())
        store.dispatch(amountActions.resetAmount())

        expect(screen.getByRole('button',{name:/Login/i})).toBeInTheDocument()

    })
    it("to check all the burger button",()=>{
        const {store}=renderWithProviders(
            <MemoryRouter>
                <SideBarComp />
                <ButtonAppBar />
            </MemoryRouter>
        )


        expect(screen.getByTestId('test1')).toBeInTheDocument()
        expect(screen.getByText('Home')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('test1'))
        store.dispatch(barActions.toggle)
        // expect(screen.getByText('Home')).not.toBeInTheDocument()
    })
})