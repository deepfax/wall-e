import React, { useState } from 'react'
import { Button, Grid, List, TextField, Typography, useScrollTriggers } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { transactionActions } from '../redux-store/TransactionStore'
import { useNavigate } from 'react-router-dom'
import AlertPage from './AlertPage'
import LoaderFIle from './LoaderFIle'
import { Flare } from '@mui/icons-material'

function SendAmount() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [checkAmount,setAmount]=useState(
        {
            email:sessionStorage.getItem('email'),
            amount:0.0
        }
    )
    const [errorData,setError]=useState('')
    const [isvalid,setIsValid]=useState(false)
    const [disabled,setDisabled]=useState(false)
    const [isLoading,setLoading]=useState(false)
    const [reciverData,setData]=useState(
        {
            senderMail:sessionStorage.getItem('email'),
            receiverMail:'',
            amount:0.0,
            description:'',
            accPassword:''
        }
    )
    const handleChange=(event,inputParams,newValue)=>
    {
        setError('')
      setData(prevData=>
        {
          return{
            ...prevData,
            [inputParams]:newValue
        }
        })
        if(!(inputParams==='accPassword'))
            setIsValid(false)
        event.preventDefault();
    }
    const handleChange1=(event,inputParams,newValue)=>
    {
      setAmount(prevData=>
        {
          return{
            ...prevData,
            [inputParams]:newValue
        }
        })
        setIsValid(false)
        event.preventDefault();
    }
    const handleClick=async(event)=>
    {
        event.preventDefault()
        setError('')
        // console.log()
        setDisabled(true)
        try{
        const response=await axios.post("http://localhost:8080/account/check-amount",checkAmount,{
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const responseData=await response.data
        console.log(responseData)
        if(responseData){
            console.log("here")
            setIsValid(true)
            setData(prevData=>
                {
                  return{
                    ...prevData,
                amount:checkAmount.amount
                }
                })
           
        }
        else
        {
            setError("Insufficient Balance")
        }
    }
        catch(error)
        {
            console.log(error)
            if(error.response.status==403)
                {
                    navigate("/login")
                }
            else{
            setError(error.response.data.message)}
        }
        finally
        {
            setDisabled(false)
            // console.log(reciverData.amount)
        }
        

    }
    const handleSubmit=async(event)=>
    {
        setDisabled(true)
        setLoading(true)
        event.preventDefault()
        try{
            const response=await axios.post("http://localhost:8080/transaction/create",reciverData,{
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            const responseData=await response.data
            console.log(responseData)
            dispatch(transactionActions.setState({Status:'Tranaction Successful',message:'Transaction was Sucessful',senderMail:responseData.senderEmailId,receiverMail:reciverData.receiverMail,amount:responseData.amount,description:responseData.description,timestamp:responseData.timestamp}))
        }
            catch(error)
            {
               
                console.log(error)
                dispatch(transactionActions.setState({Status:'Tranaction Unsuccessful',message:error.response.data.message,senderMail:reciverData.senderMail,receiverMail:reciverData.receiverMail,amount:reciverData.amount,description:reciverData.description,timestamp:error.response.data.instant}))
            }
            finally
            {
                setLoading(false)
                navigate("/transaction-status")
            }
    }
  return (
    <>
        {!isLoading && <Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center" sx={{height:'100%'}}>
    {errorData.length>0 && <AlertPage message={errorData}/>}
    <Typography variant='h6' textAlign='center' style={{marginTop:'5px',marginBottom:'10px'}}>Send Amount</Typography>
    <form onSubmit={handleClick} style={{display:'flex',flexDirection:'column'}}>
        <TextField required           
        id="outlined-required"
        label="Email"
        placeholder='Email' type='text' value={reciverData.receiverMail} onChange={(e)=>handleChange(e,'receiverMail',e.target.value)} sx={{marginBottom:'20px'}}/>
        <TextField required           
        id="outlined-required"
        label="Amount"
        placeholder='Amount' type='number' value={checkAmount.amount} onChange={(e)=>handleChange1(e,'amount',e.target.value)} sx={{marginBottom:'20px'}}/>
        <TextField required           
        id="outlined-required"
        label="Description"
        placeholder='Description' type='text' value={reciverData.description} onChange={(e)=>handleChange(e,'description',e.target.value)} sx={{marginBottom:'20px'}}/>
        <Button variant='outlined' type='submit' disabled={disabled} sx={{marginBottom:'20px',width:'40%',marginLeft:'auto',marginRight:'auto'}}>Pay</Button>
        </form>
        {isvalid && <><TextField required           
        id="outlined-required"
          label="Pin"
          placeholder='Pin' type='password' value={reciverData.accPassword} onChange={(e)=>handleChange(e,'accPassword',e.target.value)} sx={{marginBottom:'20px'}}/>
          <Button variant="contained" onClick={handleSubmit} disabled={disabled} sx={{marginBottom:'20px'}}>Send Amount</Button>
          </>}
        </Grid>}
        {isLoading && <LoaderFIle />}
    </>
  )
}

export default SendAmount