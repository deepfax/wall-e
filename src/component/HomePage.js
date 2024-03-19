import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../redux-store/MailId'
import { Button, Divider, Grid, List, Typography,Snackbar } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import "../stylings/HomePageStyle.css"
import axios from 'axios'
import LoaderFIle from './LoaderFIle'

function HomePage() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [message,setMessage]=useState('')
    const [disabled,setDisable]=useState(false)
    const [loading,setLoading]=useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }
    useEffect(() => async function FetchData() {
        try {
            console.log('hi')
            console.log(sessionStorage.getItem('token'))
            const mail = sessionStorage.getItem('email')
            console.log(mail)
            const response = await axios.get(`http://localhost:8080/get-details/${mail}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const responseData = await response.data
            console.log(responseData)
            dispatch(userActions.setItem({ firstName: responseData.firstName, lastName: responseData.lastName, email: responseData.email, phoneNo: responseData.phoneNo }))
            console.log(userData.firstName)
        }
        catch (error) {
            console.log("in error")
            console.log(error)
            console.log("in errorss")
            navigate("/login")
            // console.log("in erro")
        }

    }
        , [])
    const handleClick = async (event) => {
        event.preventDefault()
        setDisable(true)
        setLoading(true)
        try {
            const mail = sessionStorage.getItem('email')
            console.log(mail)
            const response = await axios.get(`http://localhost:8080/transactions/get-by-mail/${mail}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const responseData = await response.data
            console.log(responseData)
            setMessage(responseData)
            setOpen(true)
        }
        catch (error) {
            console.log(error)
            setMessage(error.response.data.message)
            setOpen(true)
        }
        finally
        {
            setDisable(false)
            setLoading(false)
        }
    }

    return (
        <>
        {loading && <LoaderFIle/>}
        {!loading && <div className='homepg'>
            <Typography variant='h6' style={{ textAlign: 'center', fontWeight: 'bold' }} marginBottom='20px'>Welcome to Wall-E App</Typography>
            <Typography variant='h6' fontWeight='bold'>Hi {userData.firstName} {userData.lastName},</Typography>
            <Divider sx={{ borderBottom: '1px solid black' }} />
            <Typography variant='h6' marginTop='5px' fontWeight='bold'>About the app</Typography>
            <Typography variant='body1' marginTop='20px'>
                A React.js-based Wallet Management App features user registration, login, and core functionalities like recharging the wallet, transferring funds, and viewing account statements. Utilizes Redux for state management, Jest or Testing Library for testing, and ensures a responsive UI with Material UI. The app prioritizes security and offers a seamless financial management experience for users.</Typography>
            <Typography variant='h6' fontWeight='bold' marginBottom='20px' marginTop='20px'>Our Services</Typography>
            {/* <Grid sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'70%',marginTop:'2%','@media (max-width: 600px)': {
            height:'40%'}}}> */}
            {/* <Grid  xs='2' marginTop='20px' width='98vw' spacing={1}>
            <NavLink to='account-balance' className='link'>View Account Balance</NavLink>
            <NavLink to='get-all' className='link'>Tranaction Statements</NavLink>
            <NavLink to='send-money' className='link'>Send Amount</NavLink>
            <NavLink to='recharge-wallet' className='link'>Recharge Wallet</NavLink>
            <NavLink to="get-all-recharges" className='link'>View All Recharges</NavLink>
            <NavLink to="get-transactions" className='link'>View Transactions</NavLink>
        </Grid> */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 5, md: 12 }}>

                <Grid item xs={2} sm={4} md={4} width='50%'>
                    <NavLink to='account-balance' className='link'>View Account Balance</NavLink>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <NavLink to='get-all' className='link' >Tranaction Statements</NavLink>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <NavLink to='send-money' className='link'>Send Amount</NavLink>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <NavLink to='recharge-wallet' className='link'>Recharge Wallet</NavLink>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <NavLink to="get-all-recharges" className='link'>View All Recharges</NavLink>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <NavLink to="get-transactions" className='link'>View Transactions</NavLink>
                </Grid>


            </Grid>
            <Divider sx={{ borderBottom: '1px solid black', marginTop: '15px' }} />
            <Typography marginTop='10px' marginBottom='20px' fontWeight='bold'>Click below to get all via Mail</Typography>
            <Grid item xs={2} sm={4} md={4}>
                <Button variant='contained' onClick={handleClick} style={{ fontWeight: 'bold' }} disabled={disabled}>Transactions</Button>
            </Grid>
            <Snackbar
            data-testid='testh'
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
            />
        </div>}
        </>
    )
}

export default HomePage