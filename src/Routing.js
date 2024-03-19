import {createBrowserRouter} from 'react-router-dom'
import LoginPage from './component/LoginPage'
import SignUpPage from './component/SignUpPage'
import App from './App'
import AccountBalance from './component/AccountBalance'
import HomePage from './component/HomePage'
import SendAmount from './component/SendAmount'
import TransactionStatus from './component/TransactionStatus'
import RechargeWallet from './component/RechargeWallet'
import PaginatedTable from './component/ViewTransactions'
import ViewAllRecharges from './component/ViewAllRecharges'
import GetTransactions from './component/GetTransactions'
import RechargeStatus from './component/RechargeStatus'
import LoaderFIle from './component/LoaderFIle'

const router=createBrowserRouter([
    {
        path:'/login',
        element:<LoginPage />,
    },
    {
        path:'/signup',
        element:<SignUpPage />
    },
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<HomePage/>,
                
            },
            {
                path:'account-balance',
                element:<AccountBalance />,
             
                // loader:<LoaderFIle />
            },
            {
                path:'send-money',
                element:<SendAmount />,
              
                // loader:<LoaderFIle />
            },
            {
                path:'transaction-status',
                element:<TransactionStatus />,
          
                // loader:<LoaderFIle />
            },
            {
                path:'recharge-wallet',
                element:<RechargeWallet />,

                // loader:<LoaderFIle />
            },
            {
                path:'get-all',
                element:<PaginatedTable />,
   
                // loader:<LoaderFIle />
            },
            {
                path:'get-all-recharges',
                element:<ViewAllRecharges />,
    
                // loader:<LoaderFIle />
            },
            {
                path:'get-transactions',
                element:<GetTransactions />,
       
                // loader:<LoaderFIle />
            },
            {
                path:'recharge-status',
                element:<RechargeStatus />,
             
                // loader:<LoaderFIle />
            }
        ]
    }

])

export default router;