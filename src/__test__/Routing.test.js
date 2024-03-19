import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {BrowserRouter, MemoryRouter, useNavigate} from 'react-router-dom'
import App from '../App'
import { renderWithProviders } from './UserSlice-test'

test('full app rendering/navigating', async () => {
    renderWithProviders(
        <BrowserRouter>
    <App />
        </BrowserRouter>)
    // const user = userEvent.setup()
    // verify page content for default route
    expect(screen.getByText(/wallet/i)).toBeInTheDocument()
  
    // verify page content for expected route after navigating
    userEvent.click(screen.getByRole('link',{name:/check balance/i}))

    // await waitFor(()=>{
    // expect(screen.getByText(/account balance is:/i)).toBeInTheDocument()})
  })