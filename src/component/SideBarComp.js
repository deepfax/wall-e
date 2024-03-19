import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box,List,ListItem,ListItemText,Divider,Paper } from '@mui/material'
import '../stylings/SideBarStyle.css'
function SideBarComp() {
    const array=['/','account-balance','send-money','recharge-wallet','get-all','get-transactions','get-all-recharges']
  return (
    <div style={{width:'100%',height:'100%'}}>
         <Box role="presentation" >
        {/* <Paper /> */}
        <List>
        {['Home','Check Balance', 'Send Money','Recharge Wallet', 'View all Transactions','Get Transactions','Get All Recharges'].map((text, index) => (
            <ListItem key={text} disablePadding>
            <NavLink to={array[index]} style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isActive? "#1976d2":"white",
    };}} className='links'>
              <ListItemText primary={text} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
    </div>
  )
}

export default SideBarComp