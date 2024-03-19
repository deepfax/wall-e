import logo from './logo.svg';
import './App.css';
import HomePage from './component/HomePage';
import BottonAppBar from './component/TopBar';
import { Outlet } from 'react-router-dom';
import PaginatedTable from './component/ViewTransactions';
import SideBar from './component/SideBar';
import { Stack,Paper, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { SatelliteAlt } from '@mui/icons-material';
import SideBarComp from './component/SideBarComp';
import LoaderFIle from './component/LoaderFIle';
// import ViewTransactions from './component/ViewTransactions';
// import SendMoney from './component/SendMoney';
// import App1 from './component/SendMoney';
// import LoginPage from './component/LoginPage';
// import SignUpPage from './component/SignUpPage';

function App() {
  const bar=useSelector(state=>state.bar.bar)
  return (
  // <LoginPage/>
    // <SignUpPage />
    <Grid sx={{height:'100vh'}}>
      <Grid xs={12}>
      <BottonAppBar/>
      </Grid>
      
    <div className='content'>
      {/* <Paper /> */}
    {bar &&<menu>
      <SideBarComp/>
    </menu>}
    <main>
      <Outlet />
      {/* <LoaderFIle /> */}
    </main>
    </div>
    </Grid>

    // <SendMoney />
    // <App1 />
    // <ViewTransactions />
    // <PaginatedTable />
  );
}

export default App;
