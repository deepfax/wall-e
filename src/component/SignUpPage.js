import { Button, TextField, Typography, Grid } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../stylings/SignUpPage.css'
import AlertPage from './AlertPage';
import LoaderFIle from './LoaderFIle';

function SignUpPage() {
  const [signUpData, setSignUpData] = useState({ firstName: '', lastName: '', email: '', phoneNo: '', password: '', accPassword: '' })
  const [password, SetPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [iscorrect, setIscorrect] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [isError, setError] = useState("")
  const handlePassword = (e, char) => {
    e.preventDefault()
    SetPassword(char)
  }
  const handleChange = (event, inputParams, newValue) => {
    setSignUpData(prevData => {
      return {
        ...prevData,
        [inputParams]: newValue
      }
    })
    event.preventDefault();
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const phoneRegex = /^\d{10}$/;
    if (!(phoneRegex.test(signUpData.phoneNo))) {
      setError("Enter valid phone number")
      return;
    }
    if (signUpData.password != password) {
      setError("Passwords donot match")
      return;
    }
    if (signUpData.password === password) {
      SetPassword('');
      setIscorrect(true)
      setLoading(false)
    }

  }
  const singUp = async (event) => {
    event.preventDefault()
    setDisabled(true)
    setLoading(true)
    if (password == signUpData.accPassword)
      try {
        const response = await axios.post("http://localhost:8080/add-user", signUpData)
        const responseData = await response.data
        // if(response.status===200)\
        console.log(responseData)
        if (response.status === 200) {
          navigate("/login")
        }
      }
      catch (error) {
        setLoading(false)
        setDisabled(false)
        console.log(error)
        setError(error.response.data.message)
        setIscorrect(false)
      }
  }
  if (!iscorrect)
    return (
      <>
        {!isLoading && <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          height='100%'
        >
          {isError.length > 0 && <AlertPage message={isError} data-testid='test120' />}
          <Typography variant='h4' >Wallet App</Typography>
          <Typography variant='h6' >Sign Up</Typography>
          <form onSubmit={handleSubmit} className='forms' >
            <TextField required
              id="outlined-required"
              label="First Name"
              placeholder='First Name' value={signUpData.firstName} onChange={(e) => handleChange(e, 'firstName', e.target.value)}
            />
            <TextField required
              id="outlined-required"
              label="Last Name"
              placeholder='Last Name' value={signUpData.lastName} onChange={(e) => handleChange(e, 'lastName', e.target.value)} />
            <TextField required
              id="outlined-required"
              label="Email Id"
              placeholder='Email Id' value={signUpData.email} onChange={(e) => handleChange(e, 'email', e.target.value)} />
            <TextField required
              id="outlined-required"
              label="Phone Number" type='number'
              placeholder='Phone Number' value={signUpData.phoneNo} onChange={(e) => handleChange(e, 'phoneNo', e.target.value)} />
            <TextField required
              id="outlined-required"
              label="Password"
              placeholder='Password' type='password' value={signUpData.password} onChange={(e) => handleChange(e, 'password', e.target.value)} />
            <TextField required
              id="outlined-required"
              label="Confirm Password"
              placeholder='Confirm Password' value={password} onChange={(e) => { handlePassword(e, e.target.value) }} />
            <Button variant="contained" type='submit' disabled={disabled}>Submit</Button>
          </form>
          <Typography variant='body1' marginTop='20px'>Already have an account?</Typography>
          <NavLink to='/login' style={{ marginLeft: 'auto', marginRight: 'auto' }}>Click here</NavLink>
        </Grid>}
        {isLoading && <LoaderFIle />}
      </>
    )

  else
    return (
      <>
        {!isLoading && <div className='signup'>
          <h4 style={{ marginTop: '20px', fontWeight: 'bold', marginBottom: '10px', fontSize: '25px' }}>Enter New Account Pin</h4>
          <Typography variant='body1'>This pin is used for transaction purposes</Typography>
          <form onSubmit={singUp} className='forms'>
            <TextField required
              id="outlined-required"
              label="Account Pin"

              placeholder='Account Pin' type='password' value={signUpData.accPassword} onChange={(e) => handleChange(e, 'accPassword', e.target.value)} />
            <TextField required
              id="outlined-required"
              label="Confirm Password"
              placeholder='Confirm Pin' value={password} onChange={(e) => { handlePassword(e, e.target.value) }} />
            <Button variant="contained" type='submit' disabled={disabled}>Create Account</Button>
          </form>
        </div>}
        {isLoading && <LoaderFIle />}
      </>
    )
}

export default SignUpPage