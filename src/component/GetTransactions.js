import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, PaginationItem, Typography, TextField, Button,Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertPage from './AlertPage';
import formatTimestamp from './DateFormatter';
import LoaderFIle from './LoaderFIle';
function GetTransactions() {
  const [listOfTransactions,setTrans]=useState([])
  const [totalElements,setTotalElements]=useState(0)
  const [userMail,setUserMail]=useState('')
  const [isClicked,setIsCLicked]=useState(false)
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const [pageStatus,setPageStatus]=useState(
            {
                senderEmail:sessionStorage.getItem('email'),
                currPage:1,
                pageSize:4
            }
        )
    const [isLoading,setIsloading]=useState(true)
  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    setIsloading(false)
    setPageStatus(prevData=>
        {
          return{
            ...prevData,
            currPage:newPage
        }
        })
  };

  useEffect(()=>{const FetchAll=async()=>
  {
    setIsloading(true)
    console.log("hiii")
    // console.log(isClicked)
    // event.preventDefault()
    if(isClicked){
    try{
      console.log(pageStatus)
    const response=await axios.post("http://localhost:8080/transactions/get-transactions",{senderEmail:pageStatus.senderEmail,receiverEmail:userMail,currPage:pageStatus.currPage-1,pageSize:pageStatus.pageSize},{
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    const responseData=await response.data
    setTrans(responseData.content)
    setTotalElements(responseData.totalElements)
    console.log(responseData)
    console.log(listOfTransactions)
    }
    catch(error)
    {
        console.log(error)
        setError(error.response.data.message)
    }
    finally
    {
      console.log("finally")
        setIsloading(false)
    }
  }}
  FetchAll()
}
    
  ,[pageStatus])
  const handleChange=(event)=>
  {
    setError('')
    event.preventDefault()
    setUserMail(event.target.value);
    setPageStatus({
      senderEmail:sessionStorage.getItem('email'),
      currPage:1,
      pageSize:4
  })
    setTrans([])
    setIsCLicked(false)
    setTotalElements(0)
  }
  const handleClick=async(event)=>
  {
    event.preventDefault()
    setIsCLicked(true)
    console.log("clicked")
    setIsloading(true)
      try{
        console.log(pageStatus)
      const response=await axios.post("http://localhost:8080/transactions/get-transactions",{senderEmail:pageStatus.senderEmail,receiverEmail:userMail,currPage:pageStatus.currPage-1,pageSize:pageStatus.pageSize},{
          headers:{
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
      })
      const responseData=await response.data
      console.log(responseData.content)
      setTrans(responseData.content)
      setTotalElements(responseData.totalElements)
      console.log(responseData)
      //console.log(listOfTransactions)
      }
      catch(error)
      {
          console.log(error)
          setError(error.response.data.message)
      }
      finally
      {
        console.log("finally")
          setIsloading(false)
          console.log(listOfTransactions)
      }}
      // if(totalElements==0)
      // {
      //   return(
      //     <>
      //     <Typography variant='h4' textAlign='center'>No Transactions present</Typography>
      //     </>
      //   )
      // }
  return (
    <Grid width="100%" maxWidth="100%" height="100%" maxHeight="100%">
      {error && <AlertPage message={error} data-testid='test130'/>}
    <Typography textAlign='center' variant='h5'>Transactions</Typography>
    <form onSubmit={handleClick} style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'10px'}}>
    <TextField required           
            id="outlined-required"
            label="Email"
            placeholder='MailId' value={userMail} onChange={handleChange} style={{marginBottom:'10px'}}/>
    <Button type='submit' variant='contained' style={{marginBottom:'20px'}}>Search</Button>
    </form>
    {isClicked && !isLoading && totalElements==0 && error.length==0 && <>
      <Typography variant='h4' textAlign='center' marginTop='10px'>No Transactions present</Typography>
    </>}
    {isClicked && totalElements>0 && error.length==0  && !isLoading && <><div>
      {/* <Typography variant='h6'>{pageStatus.senderEmail}</Typography>
      <Typography variant='h6'>{userMail}</Typography> */}
     <><TableContainer component={Paper} style={{width:'95%',marginLeft:'auto',marginRight:'auto'}} data-testid='test'>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell style={{wordWrap:'break-word'}}>ID</TableCell> */}
              <TableCell style={{ fontWeight: 'bold' }}>TimeStamp</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfTransactions.map((row) => {
                if(row.senderMailId===pageStatus.senderEmail.toUpperCase()){
                    return(
                        <TableRow key={row.id} sx={{bgcolor:'#F9F871',color:'red'}} color='green' >
                {/* <TableCell style={{wordWrap:'break-word'}}>{row.id}</TableCell> */}
                <TableCell style={{wordWrap:'break-word'}}>{formatTimestamp(row.timeStamp)}</TableCell>
                <TableCell>DEBIT</TableCell>
                {/* <TableCell>{row.receiverMailId}</TableCell> */}
                <TableCell style={{wordWrap:'break-word'}}>{row.amountSent}</TableCell>
                <TableCell style={{wordWrap:'break-word'}}>{row.description}</TableCell>
              </TableRow>
            )}
            else
            {
                return(
                    <TableRow key={row.id} sx={{bgcolor:'#8DEE86',color:'green'}} data-testid='test'>
                      {/* <TableCell style={{wordWrap:'break-word'}}>{row.id}</TableCell> */}
                      <TableCell style={{wordWrap:'break-word'}}>{formatTimestamp(row.timeStamp)}</TableCell>
                      <TableCell style={{wordWrap:'break-word'}}>CREDIT</TableCell>
                      {/* <TableCell>{row.receiverMailId}</TableCell> */}
                      <TableCell style={{wordWrap:'break-word'}}>{row.amountSent}</TableCell>
                      <TableCell style={{wordWrap:'break-word'}}>{row.description}</TableCell>
                      
                    </TableRow>
                  )
                }
            })}
            
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination data-testid='tests1'
        count={Math.ceil(totalElements / pageStatus.pageSize)}
        page={pageStatus.currPage}
        defaultPage={1}
        onChange={handleChangePage}
        rowsPerPage={10}
        style={{marginTop:'10px'}}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        renderItem={(item) => (
            <PaginationItem
            component="div"
            {...item}
            icon={{ previous: <ArrowBackIcon data-testid='tests2'/>, next: <ArrowForwardIcon data-testid='tests3'/> }}
            />
            )}
            />
      {/* <p>{pageStatus.currPage}</p> */}
      </>
    </div>
    </>}
    {isClicked && isLoading &&  <LoaderFIle/>}
</Grid>
  );
};

export default GetTransactions;
