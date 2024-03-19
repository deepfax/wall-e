// HomePage.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import HomePage from '../component/HomePage';
import { userActions } from '../redux-store/MailId';
import { renderWithProviders } from './UserSlice-test';
import userEvent from '@testing-library/user-event';

jest.mock('axios',()=>(
{

    __esModule:true,
    default:{
        get:()=> ({
            data:{firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNo: '1234567890'}
        }
)}
}));



describe('HomePage Component', () => {
  it('renders HomePage component and fetches user data', async () => {
    const mockUserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNo: '1234567890',
    };

   const {store}= renderWithProviders(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
    );

        store.dispatch(userActions.setItem(mockUserData))

    await waitFor(()=>{
    expect(screen.getByText(`Hi ${mockUserData.firstName} ${mockUserData.lastName},`)).toBeInTheDocument();
    expect(screen.getByText('Welcome to Wall-E App')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();})


  })
  
});
