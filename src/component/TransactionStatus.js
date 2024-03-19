import { Button, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import formatTimestamp from './DateFormatter'
function TransactionStatus() {
    // const {data,status}=useParams()
    const traData=useSelector(state=>state.transaction)
    const navigate=useNavigate()
    const handleClick=(event)=>
    {
        navigate("/")
        event.preventDefault()
    }
    console.log(traData)
  return (
    <Stack sx={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} spacing={4}>
        <h1>{traData.Status}</h1>
        <h3>{traData.message}</h3>
        <h4>Sender Mail: {traData.senderMail}</h4>
        <h4>Receiver Mail: {traData.receiverMail}</h4>
        <h4>Amount: {traData.amount}</h4>
        <h4>Description: {traData.description}</h4>
        <h4>Time Stamp: {formatTimestamp(traData.timestamp)}</h4>
        <Button variant='outlined' onClick={handleClick} sx={{width:'50%',marginLeft:'auto',marginRight:'auto',':hover':{backgroundColor:'#1976d2',color:'white',border:'1px hidden '}}}>To Home</Button>
    </Stack>
  )
}

export default TransactionStatus