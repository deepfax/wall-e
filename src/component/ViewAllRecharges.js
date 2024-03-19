import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, PaginationItem, Typography,Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import formatTimestamp from './DateFormatter';
import LoaderFIle from './LoaderFIle';
import AlertPage from './AlertPage';
function ViewAllRecharges() {
  const [listOfTransactions,setTrans]=useState([])
  const [totalElements,setTotalElements]=useState(0)
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const [pageStatus,setPageStatus]=useState(
            {
                email:sessionStorage.getItem('email'),
                currPage:0,
                pageSize:5
            }
        )
    const [isLoading,setIsloading]=useState(true)
  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    setPageStatus(prevData=>
        {
          return{
            ...prevData,
            currPage:newPage-1
        }
        })
     
  };

  useEffect(()=>{const FetchAll=async()=>
  {
    setIsloading(true)
    try{
    const response=await axios.post("http://localhost:8080/transactions/recharges",pageStatus,{
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    const responseData=await response.data
    console.log(responseData)
    setTrans(responseData.content)
    setTotalElements(responseData.totalElements)
    }
    catch(error)
    {
      if(error.response.status==400)
      {
        setError(error.response.data.message); 
      }
      else{
        console.log(error)
        navigate("/login")}
    }
    finally
    {
        setIsloading(false)
    }
  }
  FetchAll()
},[pageStatus])
  
  return (
    <Grid xs={6} marginTop='10px'>
      {error && <AlertPage message={error}/>}
    {!isLoading && !error && <Grid
   width="100%" maxWidth='100%' height="100%" maxHeight="100%" >
    <Typography textAlign='center' variant='h6'>Recharges</Typography>
    <Typography variant='body1' marginTop='20px' marginLeft='10px' marginBottom='15px' fontWeight='bold'>Email: {pageStatus.email}</Typography>
    <Grid sx={{width:'90%',marginLeft:'auto',marginRight:'auto', marginTop:'20px'}}>
      <TableContainer component={Paper} style={{maxHeight:'80%',height:'80%',overflowY:'auto'}}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell style={{fontWeight:'bold'}}>TimeStamp</TableCell>
              <TableCell style={{fontWeight:'bold'}}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {listOfTransactions.map((row,index) => {
                    return(
                        <TableRow key={index} data-testid='test1'>
                {/* <TableCell>{index}</TableCell> */}
                <TableCell>{formatTimestamp(row.timeStamp)}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            )
        })}
            {isLoading && <><h1>Data Loading....</h1></>}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalElements / pageStatus.pageSize)}
        page={pageStatus.currPage+1}
        defaultPage={1}
        onChange={handleChangePage}
        rowsPerPage={10}
        
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        renderItem={(item) => (
            <PaginationItem
            component="div"
            {...item}
            icon={{ previous: <ArrowBackIcon />, next: <ArrowForwardIcon /> }}
            />
            )}
            />
      {/* <p>{pageStatus.currPage+1}</p> */}
    </Grid>
</Grid>}
{isLoading && <LoaderFIle/>}
</Grid>
  );
};

export default ViewAllRecharges;
