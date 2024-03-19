import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function AlertPage({message}) {
  return (
    <Alert severity="error" style={{width:'80%'}} >
        {message}
    </Alert>
  );
}
