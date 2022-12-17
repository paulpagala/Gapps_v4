import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
//
import Editor from "../components/Editor";
import useLocalStorage from '../hooks/useLocalStorage';
import { useGlobalContext } from '../context/global';





export default function AddressForm() {
  const {setPaidAmount,setGcashNumber,setPaymentRestriction,setCancellationRestriction,setEarliestDateRestriction} = useGlobalContext()

// amount to be paid
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleChange = event => {
    setValue(event.target.value);
    setPaidAmount(event.target.value);
    if (!Number.isInteger(Number(event.target.value))) {
      setError(true);
    } else {
      setError(false);
    }
  };

//phone number
  const phoneRegex = /^(09|\+639)\d{9}$/
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = React.useState(false);

  const handleChangeNumber = (event) => {
    setPhoneNumber(event.target.value);
    setGcashNumber(event.target.value)
    if (!phoneRegex.test(event.target.value)) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false);
    }
  };



  const [costOfServiceBooking, setcostOfServiceBooking] = React.useState('');

  const handleChangeCostOfServiceBooking = (event) => {
    setcostOfServiceBooking(event.target.value);
    setPaymentRestriction(event.target.value)
  };

  const [cancelDeadline, setCancelDeadline] = React.useState('');
  const [errorCancellationDeadline, setErrorCancellationDeadline] = React.useState('');

  const handleChangeCancelDeadline = (event) => {
    setCancelDeadline(event.target.value);
    setCancellationRestriction(event.target.value);
    if (event.target.value) {
      setErrorCancellationDeadline('')
    }
    else {
      setErrorCancellationDeadline('solid red 5px')
    }
  };

  const [earliestBook, setEarliestBook] = React.useState('');
  const [errorEarliestDate, setErrorEarliestDate] = React.useState('');
  

  const handleChangeEarliestBook = (event) => {
    setEarliestBook(event.target.value);
    setEarliestDateRestriction(event.target.value)
    if (event.target.value) {
      setErrorEarliestDate('')
    }
    else {
      setErrorEarliestDate('solid red 5px')
    }
    // } else {
    //   setErrorEarliestDate(false);
    // }
  };

  
 
console.log(earliestBook)


  return (

    <React.Fragment>

      <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box>
          <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Rules & guidelines</Typography>
          <Typography sx={{ ml: 3, mt: 2 }}>Cost of service booking</Typography>
        </Box>
        <FormControl sx={{ ml: 3, display: 'block' }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={costOfServiceBooking}
            onChange={handleChangeCostOfServiceBooking}
          >
            <FormControlLabel value="free" control={<Radio />} label="Free of charge" />
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
          </RadioGroup>
        </FormControl>

        {costOfServiceBooking === 'paid' ?
          (<Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
            <Box>
              <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
                Booking Price
              </Typography>
              <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 21}} gutterBottom>
                Receiving GCash number wallet
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl>

                <TextField
                  variant="outlined"
                  value={value}
                  onChange={handleChange}
                  error={error}
                  helperText={error ? 'Please enter a valid amount' : ''}
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">PHP</InputAdornment>,min:0
                  }}
                 
                />
              </FormControl>
              <FormControl sx={{ ml: 6, width: 400 }} >
                <TextField
                  value={phoneNumber}
                  variant="outlined"
                  onChange={handleChangeNumber}
                  error={errorPhoneNumber}
                  helperText={errorPhoneNumber ? 'Please enter a valid phone number' : ''}
                  placeholder="Enter GCash number"
                  InputProps={{min:0}}
                />
              </FormControl>
            </Box>
          </Paper>)
          : null}


        <Box>
          <Box>
            <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3 }} gutterBottom>
              Earliest date employees can book
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              id="outlined-number"
              // label="Number of Slots"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={earliestBook}
              onChange={handleChangeEarliestBook}
              sx={{ width: '86px', ml: 3, border:errorEarliestDate, borderRadius:2}}
              inputProps={{min:0,}}
              placeholder="0"
            />
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'black', ml: 3 }}>days before the booking</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box>
            <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3 }} gutterBottom>
              Cancellation deadline
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              id="outlined-number"
              // label="Number of Slots"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={cancelDeadline}
              onChange={handleChangeCancelDeadline}
              sx={{ width: '86px', ml: 3, border: errorCancellationDeadline, borderRadius:2}}
              inputProps={{min:0}}
              placeholder="0"
            />
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'black', ml: 3 }}>minutes before the booking</Typography>
          </Box>
          <Typography component="subtitle1" variant="subtitle1" sx={{ color: '#6F8191', display: 'block', ml: 3 }} gutterBottom>
            Employees can cancel <strong>{Math.floor((cancelDeadline) / 60)} hour and {(cancelDeadline) % 60} minutes </strong>  before the booking
          </Typography>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box sx={{ ml: 3 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Policies</Typography>
          <Typography variant="body1" color="#6F8191" sx={{ mt: 1 }}>
            Enter guidelines, rules, regulations, or directions for your service
          </Typography>
          <Box sx={{ width: '778px', height: '587px', mt: 2 }}>
            <Editor />
          </Box>

        </Box>

      </Paper>

    </React.Fragment>

  );
}