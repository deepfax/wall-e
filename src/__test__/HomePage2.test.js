import { screen, render, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { renderWithProviders } from "./UserSlice-test";
import HomePage from "../component/HomePage";
import SendAmount from "../component/SendAmount";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import ViewAllRecharges from "../component/ViewAllRecharges";
import { act } from "react-test-renderer";
jest.mock('axios')
jest.mock('react-router-dom')
beforeAll(() => {
    sessionStorage.setItem('email', 'johndoe@mail.com')
    sessionStorage.setItem('token', 'new token')
})

describe("test for invalid cases", () => {

    it("test for unauthorization", async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        renderWithProviders(
            <SendAmount />
        )
        const amount = 200
        // axios.post.mockResolvedValue({data:false})
        axios.post.mockRejectedValue({ response: { status: 403 } });
        expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText(/email/i), "deepak@mail.com")
        userEvent.type(screen.getByPlaceholderText(/amount/i), amount.toString())
        userEvent.type(screen.getByPlaceholderText(/description/i), "test")
        const checkaAmount = {
            email: "johndoe@mail.com",
            amount: "0200"
        }

        fireEvent.click(screen.getByRole('button', { name: /pay/i }))

        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/account/check-amount", checkaAmount, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
    })
    it("test for mail", async () => {

        axios.get.mockResolvedValue({ data: 'Success' })
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const { store } = renderWithProviders(
            <>
                <HomePage />
            </>
        );

        userEvent.click(screen.getByRole('button', { name: 'Transactions' }))

        await waitFor(() => {
            screen.getByTestId('testh')
        })

    })
    it("test for invalid mail", async () => {

        axios.get.mockRejectedValue({response:{data:{message:"hello"}} })
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const { store } = renderWithProviders(
            <>
                <HomePage />
            </>
        );

        userEvent.click(screen.getByRole('button', { name: 'Transactions' }))

        await waitFor(() => {
            screen.getByTestId('testh')
        })
        act(()=>{
        userEvent.click(screen.getByTestId('testh'))})

    })
})