import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux-store/MailId';
import { transactionActions } from '../redux-store/TransactionStore';
import { useNavigate } from 'react-router-dom';
import '../stylings/TopBarStyle.css'
import { barActions } from '../redux-store/BarDisplay';
import { rechargeActions } from '../redux-store/RechargeStore';
export default function ButtonAppBar() {
  // const [searchData,setSearchData]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // const handleChange=(event)=>
  // {
  //   event.preventDefault()
  //   setSearchData(event.target.value)
  // }
  const handleClick=(event)=>
  {
    event.preventDefault()
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
    dispatch(userActions.resetItem)
    dispatch(transactionActions.deleteState)
    dispatch(rechargeActions.deletState)
    navigate("/login")

  }
  const handleClick1=(event)=>
  {
    event.preventDefault()
    dispatch(barActions.toggle())
  }
  return (
    <div>

    <Box width="100vw" maxWidth="100vw" >
      <AppBar position="fixed" minHeight='15vh' maxHeight='15vh'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, '@media (max-width: 600px)': {
              display:'block'}, }}
              data-testid='test1'
            //className='buttons'
            onClick={handleClick1}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div"  width='25%'>
            Wall-E
          </Typography>
          {/* <TextField  id="standard-basic"
          // label="SearchB"
        placeholder='Seacrh Bar' value={searchData} onChange={handleChange} sx={{bgcolor:'white',alignContent:'center'}}/> */}
          <Button color="inherit" sx={{ml:'auto'}} onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}