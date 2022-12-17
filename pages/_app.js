import '../styles/landingPage.css'
import '../styles/globals.css'
import '../styles/editor.css'
import ResponsiveAppBar from "./navbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalProvider from '../context/global';
import { useState } from "react";


function MyApp({ Component, pageProps }) {
  
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'FS Elliot Pro',
      },
      button: {
        textTransform: 'none'
      }
    },
  });


 const [dayRestriction, setDayRestriction] = useState([])
 const [checkInOptions, setCheckInOptions] = useState('')
 const [checkInRestriction, setCheckInRestriction] = useState(false)
 const [checkInAndOutRestriction, setCheckInAndOutRestriction] = useState(false);
 const [dailyCheckInRestriction, setDailyCheckInRestriction] = useState('');
 const [dailyCheckInAndOutRestriction, setDailyCheckInAndOutRestriction] = useState('');
 const [parkingAreaName, setParkingAreaName] = useState('')
 const [parkingAreaAddress , setParkingAreaAddress ] = useState('') 
 const [parkingAreaFloor, setParkingAreaFloor] = useState('')
 const [parkingAreaSlots, setParkingAreaSlots] = useState('')
 const [parkingSlotNames, setParkingSlotNames] = useState([])
 const [paidAmount, setPaidAmount] = useState('')
 const [gcashNumber, setGcashNumber] = useState('')
 const [paymentRestriction, setPaymentRestriction] = useState('')
 const [cancellationRestriction, setCancellationRestriction] = useState('')
 const [earliestDateRestriction, setEarliestDateRestriction] = useState('') 


  

  return (
    
    <ThemeProvider theme={theme}>
    <GlobalProvider value={{
      dayRestriction,
      setDayRestriction,
      checkInAndOutRestriction,
      setCheckInAndOutRestriction,
      checkInRestriction,
      setCheckInRestriction,
      checkInOptions,
      setCheckInOptions,
      dailyCheckInAndOutRestriction,
      setDailyCheckInAndOutRestriction,
      dailyCheckInRestriction,
      setDailyCheckInRestriction,
      parkingAreaName,
      setParkingAreaName,
      parkingAreaAddress,
      setParkingAreaAddress,
      parkingAreaFloor,
      setParkingAreaFloor,
      parkingAreaSlots,
      setParkingAreaSlots,
      parkingSlotNames,
      setParkingSlotNames,
      paidAmount,
      setPaidAmount,
      gcashNumber,
      setGcashNumber,
      paymentRestriction,
      setPaymentRestriction,
      cancellationRestriction,
      setCancellationRestriction,
      earliestDateRestriction,
      setEarliestDateRestriction
      }}>
    <ResponsiveAppBar />
    <Component {...pageProps} />
    </GlobalProvider>
    </ThemeProvider>
   
  
  );
}

export default MyApp
