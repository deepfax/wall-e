

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import LoginPage from '../component/LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import AlertPage from '../component/AlertPage';
import { useNavigate } from 'react-router-dom';
jest.mock('axios'); // Mocking axios to control its behavior
jest.mock('react-router-dom')
describe('LoginPage component', () => {
  test('renders login form and handles submission', async () => {
    // Mock successful API response
    axios.post.mockResolvedValue({ status: 200, data: 'mockToken' });
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    // Render the component
    render(< >
      <AlertPage />
      <LoginPage />
    </>);

    // Simulate user input
    act(()=>{
      userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'password123');
      // // Simulate form submission
      fireEvent.click(screen.getByRole('button', { name: /login/i }));})
      
      // // Assert that axios.post was called with the correct data
     
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/authenticate', {
          email: 'test@example.com',
          password: 'password123',
        });
      
    
    
    await waitFor(()=>
    {
        expect(mockNavigate).toHaveBeenCalledWith('/');
    })
   
  });
  it("invalid data",async()=>
  {
    axios.post.mockRejectedValue({response:{status:403}});
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    // Render the component
    render(< >
      <AlertPage />
      <LoginPage />
    </>);

    // Simulate user input
      userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'password123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      

      
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/authenticate', {
          email: 'test@example.com',
          password: 'password123',
        });
        await waitFor(()=>
        {
          screen.getByText(/invalid/i)
        })
        // expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  })
  it("invalid test2",async()=>
  {
    axios.post.mockRejectedValue({response:{status:400}});
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    // Render the component
    render(< >
      <AlertPage />
      <LoginPage />
    </>);

    // Simulate user input
      userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'password123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));
      

      
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/authenticate', {
          email: 'test@example.com',
          password: 'password123',
        });
        await waitFor(()=>
        {
          screen.getByText(/invalid/i)
        })
  }
  )
});
