import { TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
// import { Visibility,VisibilityOff } from '@mui/icons-material'
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
import '../stylings/LoginPage.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertPage from './AlertPage';

function LoginPage() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate()
    const [isError, setError] = useState(false)
    const [error, setErrorMsg] = useState('')

    //   const handleTogglePasswordVisibility = () => {
    //     setShowPassword((prevShowPassword) => !prevShowPassword);
    //   };
    const handleChange = (event, inputParams, newValue) => {
        setError(false)
        setErrorMsg('')
        setLoginData(prevData => {
            return {
                ...prevData,
                [inputParams]: newValue
            }
        })
        event.preventDefault();
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)
        loginData.email.trim(" ")
        // let response;
        // const response = await axios.post("http://localhost:8080/authenticate", loginData)
        // const responseData = await response.data
        // console.log(responseData)
        try {
            const response = await axios.post("http://localhost:8080/authenticate", loginData)
            const responseData = await response.data
            console.log(responseData)
            if (response.status == 200) {
                sessionStorage.setItem("email", loginData.email)
                sessionStorage.setItem('token', responseData)
                console.log("hi")
                navigate('/')
            }
        }
        catch (error) {
            console.log(error)
            setError(true)
            if (error.response.status === 403 || error.response.status===400) {
                console.log("in error")
                setErrorMsg("invalid credentials")
            }
        }
        finally {
            setDisabled(false)
            // console.log("hello")

        }



    }
    return (
        <>
            <div className='loginpg' data-testid='test12'>
                {isError && <AlertPage message={error} data-testid='test'/>}
                <Typography variant='h4' marginBottom='10px' marginTop='10px'>Wallet App</Typography>
                <Typography variant='h6' marginBottom='15px'>Login</Typography>

                <form className='form' onSubmit={handleSubmit}>
                    <TextField required
                        id="outlined-required"
                        label="Email"
                        placeholder='MailId' value={loginData.email} onChange={(e) => handleChange(e, 'email', e.target.value)} />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={loginData.password}
                        onChange={(e) => handleChange(e, 'password', e.target.value)}
                    />
                    <Button variant="contained" type='submit' disabled={disabled}>Login</Button>
                </form>
                <Typography variant='body1' marginTop='15px'>Do Not have an account?</Typography>
                <NavLink to='/signup'>Click Here</NavLink>
            </div>
        </>
    )
}

export default LoginPage