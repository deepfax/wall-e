import { Button,Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import {TextField} from '@mui/material'
import { useDispatch } from 'react-redux'
import { rechargeActions } from '../redux-store/RechargeStore'
import { useNavigate } from 'react-router-dom'
import LoaderFIle from './LoaderFIle'

function RechargeWallet() {
    const [rechargeData,setRecharge]=useState({
        email:sessionStorage.getItem('email'),
        amount:0.0,
        password:''
    })
    const [disable,setDisable]=useState(false)
    const [loading,setLoading]=useState(false)
    const [isAuth,setAuth]=useState(true)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleChange=(event,inputParams,newValue)=>
    {
      setRecharge(prevData=>
        {
          return{
            ...prevData,
            [inputParams]:newValue
        }
        })
        event.preventDefault();
    }

    const handleSubmit=async(event)=>
    {
        setLoading(true)
        setDisable(true)
        event.preventDefault()
        try{
        const response=await axios.post("http://localhost:8080/transaction/recharge-wallet",rechargeData,{
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const responseData=await response.data
        console.log(responseData)
        if(response.status===200)
        {
            dispatch(rechargeActions.setState({Status:"Recharge Successful",message:"Recharge was Successful",email:rechargeData.email,amount:responseData.amount,timeStamp:responseData.timeStamp}))
            navigate("/recharge-status")
        }
    }
        catch(error)
        {
            console.log(error)
            if(error.response.status==403)
            {
                console.log("inside error")
                navigate("/login")
                // setAuth(false)
            }
            else{
            dispatch(rechargeActions.setState({Status:"Recharge Unsuccessful",message:error.response.data.message,email:rechargeData.email,amount:rechargeData.amount,timeStamp:error.response.data.instant}))
            navigate("/recharge-status")
        }

        }
        
        
    }
  return (
    <>
    {!loading &&
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center" height='100%'>
        <Typography variant='h5' textAlign='center' marginBottom='20px'>Recharge Wallet</Typography>
        <form typeof='submit' onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',justifyContent:'center',height:'50%', alignItems:'center'}}>
           <TextField required           
            id="outlined-required"
            label="Amount"
            placeholder='Amount' value={rechargeData.amount} onChange={(e)=>handleChange(e,'amount',e.target.value)} sx={{marginBottom:'10px'}} type='number'/>
            <TextField required           
            id="outlined-required"
            label="Pin"
            placeholder='Pin' type='password' value={rechargeData.password} onChange={(e)=>handleChange(e,'password',e.target.value)} sx={{marginBottom:'10px'}}/>
          <Button variant='outlined' type='submit' sx={{marginBottom:'10px'}} disabled={disable}>Recharge</Button>
        </form>
    </Grid>}
    {loading && <LoaderFIle />}
    </>
  )
}

export default RechargeWallet