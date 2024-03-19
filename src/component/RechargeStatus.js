import React from 'react'
import { Stack, Typography,Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertPage from './AlertPage'
import formatTimestamp from './DateFormatter'
function RechargeStatus() {
    const navigate=useNavigate()
    const rechargeStatus=useSelector(state=>state.recharge)
    const handleClick=(event)=>
    {
        event.preventDefault()
        navigate("/")
    }
  return (
    <Stack sx={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} spacing={4}>
      {/* <AlertPage message={rechargeStatus.Status}/> */}
        <Typography variant='h3' data-testid='test1'>{rechargeStatus.Status}</Typography>
        <Typography variant='h5'>Message: {rechargeStatus.message}</Typography>
        <Typography variant='h5'>MailId: {rechargeStatus.email}</Typography>
        <Typography variant='h5'>Amount: {rechargeStatus.amount}</Typography>
        <Typography variant='h5'>TimeStamp: {formatTimestamp(rechargeStatus.timestamp)}</Typography>
        <Button variant='outlined' onClick={handleClick} style={{width:'50%'}}>Go Back To Main Menu</Button>
    </Stack>
  )
}

export default RechargeStatus