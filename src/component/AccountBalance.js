import { Grid,Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { amountActions } from '../redux-store/AmountBalance'


function AccountBalance() {
    // const [amount,setAmount]=useState(0)
    const amount=useSelector(state=>state.amount.amount)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>async function func(event)
    {
        
        const mailId=sessionStorage.getItem('email');
        try{
            const response=await axios.get(`http://localhost:8080/account/get-balance/${mailId}`,{
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const responseData=response.data
        // setAmount(responseData)
        dispatch(amountActions.setAmounts({amount:responseData}))
        console.log(responseData,"response data")
        // console.log(amount,"amount")
        // event.preventDefault()
    }
    catch(error)
        {
            
            console.log("error")
            console.log(error)
                // navigate("/login")
        }
    },[])

    console.log(amount,"amount")
    
    const handleClick=()=>
    {
        navigate("/")
    }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{height:'100%'}}
      >
        <Typography variant='h4' textAlign='center' marginBottom='10px'>The Account Balance is:</Typography>
        <h2 data-testid='test'>{amount}</h2>
        <Button variant='contained' onClick={handleClick} sx={{marginTop:'20px'}}>Main Menu</Button>
    </Grid>
  )
}

export default AccountBalance