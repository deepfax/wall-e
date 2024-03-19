import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, PaginationItem, Typography, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import LoaderFIle from './LoaderFIle';
import formatTimestamp from './DateFormatter';
const PaginatedTable = () => {
  const [listOfTransactions, setTrans] = useState([])
  const color = red[500];
  const navigate = useNavigate()
  const [totalElements, setTotalElements] = useState(0)
  const [pageStatus, setPageStatus] = useState(
    {
      email: sessionStorage.getItem('email'),
      currPage: 0,
      pageSize: 5
    }
  )
  const [isLoading, setIsloading] = useState(true)
  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    console.log(event, newPage)
    setPageStatus(
      {
        ...pageStatus,
        currPage: newPage - 1
      }
    )
  };



  useEffect(() => {
    const fetchAll = async () => {
      setIsloading(true)
      try {
        const response = await axios.post("http://localhost:8080/transactions/get-all", pageStatus, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        const responseData = await response.data
        console.log(responseData)
        setTrans(responseData.content)
        setTotalElements(responseData.totalElements)
        setIsloading(false)
      }
      catch (error) {
        setIsloading(false)
        console.log(error)
        if (error.response.status === 403) {
          navigate("/login")
        }
      }
    }
    fetchAll()
  }, [pageStatus])

  return (
    <>
      {!isLoading && listOfTransactions.length == 0 && <>
        <Typography variant='h5' textAlign='center'>No Transactions present</Typography>
      </>}
      {!isLoading && listOfTransactions.length > 0 && <Grid width="100%" maxWidth="100%" height="100%" maxHeight="100%">
        <Typography textAlign='center' variant='h4'>Transactions</Typography>
        <div>
          <TableContainer component={Paper} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell style={{ fontWeight: 'bold' }}>TimeStamp</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfTransactions.map((row) => {
                  if (row.senderMailId === pageStatus.email.toUpperCase()) {
                    return (
                      <TableRow key={row.id} sx={{ bgcolor: '#F9F871' }} style={{ color: color, maxWidth: '98%' }} data-testid='test'>
                        {/* <TableCell style={{wordWrap:'break-word'}} >{row.id}</TableCell> */}
                        <TableCell>{formatTimestamp(row.timeStamp)}</TableCell>
                        <TableCell>DEBIT</TableCell>
                        <TableCell>{row.receiverMailId}</TableCell>
                        <TableCell>{row.amountSent}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    )
                  }
                  else {
                    return (
                      <TableRow key={row.id} sx={{ bgcolor: '#8DEE86' }} style={{ color: color, maxWidth: '98%' }}>
                        {/* <TableCell>{row.id}</TableCell> */}
                        <TableCell>{formatTimestamp(row.timeStamp)}</TableCell>
                        <TableCell>CREDIT</TableCell>
                        <TableCell>{row.senderMailId}</TableCell>
                        <TableCell>{row.amountSent}</TableCell>
                        <TableCell>{row.description}</TableCell>

                      </TableRow>
                    )
                  }
                })}

              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(totalElements / pageStatus.pageSize)}
            page={pageStatus.currPage + 1}
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
        </div>
      </Grid>}
      {isLoading && <><LoaderFIle /></>}

    </>
  );
};

export default PaginatedTable;
