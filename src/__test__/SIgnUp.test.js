import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Mock axios if needed
import SignUpPage from '../component/SignUpPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AlertPage from '../component/AlertPage';

jest.mock('axios'); // Mock axios
jest.mock('react-router-dom')
describe('SignUpPage Component', () => {
  it('renders the SignUpPage component correctly', () => {
    const mockNavigate = jest.fn();
    render(
      <>
        <SignUpPage />
      </>);
    useNavigate.mockReturnValue(mockNavigate);
    // Add your assertions here based on the rendered content
    expect(screen.getByText('Wallet App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    // ... add more assertions based on your UI structure
  });

  it('handles form submission correctly', async () => {
    // Mock the axios post method to simulate a successful submission
    // axios.post.mockResolvedValue({ data:{} });

    render(
      <>

        <SignUpPage />
      </>
    );

    // Simulate user input
    userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Kelly')
    userEvent.type(screen.getByPlaceholderText('Email Id'), "john.kelly@mail.com")
    userEvent.type(screen.getByPlaceholderText('Phone Number'), "1234567890")
    userEvent.type(screen.getByPlaceholderText('Password'), "password123")
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), "password123")

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    // Wait for the asynchronous submission process to complete
    await waitFor(() => {
      // Add assertions for the expected behavior after successful submission
      expect(screen.getByText('Enter New Account Pin')).toBeInTheDocument();
      // ... add more assertions
    });
  });

  it('handles sign up form submission correctly', async () => {
    axios.post.mockResolvedValue({ status: 200 });
    // const mockHistoryPush = jest.fn();
    // const mockHistory = { push: mockHistoryPush };
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <>
        <SignUpPage />
      </>
    );
    userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Kelly')
    userEvent.type(screen.getByPlaceholderText('Email Id'), "john.kelly@mail.com")
    userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890')
    userEvent.type(screen.getByPlaceholderText('Password'), "password123")
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), "password123")

    fireEvent.submit(screen.getByRole('button', {
      name: 'Submit', data: {
        firstName: 'John',
        lastName: 'Kelly',
        email: 'john.kelly@mail.com',
        phoneNo: '1234567890',
      }
    }));

    // Wait for the asynchronous submission process to complete
    await waitFor(() => {
      // Add assertions for the expected behavior after successful submission
      expect(screen.getByText('Enter New Account Pin')).toBeInTheDocument();
      // ... add more assertions
    });

    userEvent.type(screen.getByPlaceholderText('Account Pin'), 'userPassword');
    userEvent.type(screen.getByPlaceholderText('Confirm Pin'), "userPassword")
    // ... type in other input fields for the second form

    // Submit the second form
    fireEvent.submit(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/add-user', {
        firstName: 'John',
        lastName: 'Kelly',
        email: 'john.kelly@mail.com',
        phoneNo: '1234567890',
        password: 'password123',
        accPassword: 'userPassword'
      });
    });
    // Wait for the asynchronous submission process to complete
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    })
  });
  it("invalid case", async () => {
    axios.post.mockRejectedValue({ response: { data: { message: "invalid" } } });
    // const mockHistoryPush = jest.fn();
    // const mockHistory = { push: mockHistoryPush };
    render(
      <>
        <SignUpPage />
      </>
    );


    userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Kelly')
    userEvent.type(screen.getByPlaceholderText('Email Id'), "john.kelly@mail.com")
    userEvent.type(screen.getByPlaceholderText('Phone Number'), "1234567890")
    userEvent.type(screen.getByPlaceholderText('Password'), "password123")
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), "password123")

    fireEvent.submit(screen.getByRole('button', {
      name: 'Submit', data: {
        firstName: 'John',
        lastName: 'Kelly',
        email: 'john.kelly@mail.com',
        phoneNo: '1234567890',
      }
    }));


    await waitFor(() => {
      // Add assertions for the expected behavior after successful submission
      expect(screen.getByText('Enter New Account Pin')).toBeInTheDocument();
      // ... add more assertions
    });
    await waitFor(() => {

      userEvent.type(screen.getByPlaceholderText('Account Pin'), 'userPassword');
      userEvent.type(screen.getByPlaceholderText('Confirm Pin'), "userPassword")
    })
    // ... type in other input fields for the second form

    // Submit the second form
    fireEvent.submit(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/add-user', {
        firstName: 'John',
        lastName: 'Kelly',
        email: 'john.kelly@mail.com',
        phoneNo: '1234567890',
        password: 'password123',
        accPassword: 'userPassword'
      });
    });
  });
  it("invalid phone number", async() => {
    render(
      <>
      <AlertPage/>
      <SignUpPage />
      </>
    );


    userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Kelly')
    userEvent.type(screen.getByPlaceholderText('Email Id'), "john.kelly@mail.com")
    userEvent.type(screen.getByPlaceholderText('Phone Number'), '-1234567890')
    userEvent.type(screen.getByPlaceholderText('Password'), "password123")
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), "password123")

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));


    await waitFor(()=>
    {
      screen.getByText('Enter valid phone number')
    })

  })
  it("invalid password",async()=>{
    render(
      <>
      <AlertPage/>
      <SignUpPage />
      </>
    );


    userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last Name'), 'Kelly')
    userEvent.type(screen.getByPlaceholderText('Email Id'), "john.kelly@mail.com")
    userEvent.type(screen.getByPlaceholderText('Phone Number'), '9741608985')
    userEvent.type(screen.getByPlaceholderText('Password'), "password123")
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), "password1")

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));


    await waitFor(()=>
    {
      screen.getByText('Passwords donot match')
    })
  })
});
