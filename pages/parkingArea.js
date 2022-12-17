import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';

import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../context/global';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useLocalStorage from "../hooks/useLocalStorage"
// import { Refresh } from '@mui/icons-material';

// import Link from '@mui/material/Link';

// import axios from 'axios';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


export default function ParkiongArea() {
  const router = useRouter();
  const { parkingSlotNames, parkingAreaSlots, parkingAreaName, parkingAreaAddress } = useGlobalContext();
  const [selected, setSelected] = React.useState(false);
  const [filterActive, setFilterActive] = React.useState();
  const [error, setError] = React.useState("");
  // const router = useRouter();

  const handleChangeFilterActive = (event) => {
    setFilterActive(event.target.value);
  };
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6F8191',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#EDF3F8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  // useEffect(() => {
  // const slotNames = JSON.parse(window.localStorage.getItem('slotnames'))
  // const numberOfSlots = parseInt(JSON.parse(window.localStorage.getItem('numberofslots')))
  // },);

  // const slotNames = JSON.parse(window.localStorage.getItem('slotnames'))
  // const numberOfSlots = parseInt(JSON.parse(window.localStorage.getItem('numberofslots')))
  // const [numberOfSlots, setNumberOfSlots] = React.useState()

  // const handleChangeNumberOfSlots = (event) => {
  //   setNumberOfSlots(event.target.value);
  // };

  function createData(slotId, slotName, status, action) {
    return { slotId, slotName, status, action };
  }

  const rows = [];
  // for (let i = (parkingAreaSlots - slotApi); i <= parkingAreaSlots; i++) {
  //   // Add each number to the array
  //   rows.push(createData('MCHD00' + i, parkingSlotNames[i - 1], 'Available', 'pj'));
  // }


  const [slotApi, setSlotApi] = React.useState()
  function FindSlotNumbers() {
    const options = {
      method: 'GET',
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':"*",
      }
    };
    // setIsLoading(true);
    // const gender = "male"
    // const height = "165"
    fetch('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingareas', options)
      .then((response) => response.json())
      .then((response) => {
        // setWeight(response.data.Hamwi);
        // console.log(response.ParkingAreas[5].slots);
        // console.log(response.ParkingAreas)
        setSlotApi(response.ParkingAreas[0].slots);
        // console.log(response)
        // console.log(slotApi)
        // setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to retrieve from api");
      });
  }

  useEffect(() => {
    const getData = () => {
      FindSlotNumbers();
    };
    getData();
  });


  async function postSlot(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  {
    rows.map((row) => (
      postSlot('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/slot',
        {
          "slotId": row.slotId,
          "parkingArea": parkingAreaName,
          "username": "",
          "email": ""
        })
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        })))
  }
  
  function routetoEditParking () {
    router.push("/EditParkingDetail")
  }
  const bookedRow = [] 
  for (let i=1; i <= (parkingAreaSlots - slotApi) ; i++) {
    bookedRow.push(createData('MCHD00' + i, parkingSlotNames[i - 1], 'Booked', 'pj'));
  }
  for (let i = (parkingAreaSlots - slotApi); i < parkingAreaSlots; i++) {
    // Add each number to the array
    rows.push(createData('MCHD00' + i, parkingSlotNames[i-1], 'Available', 'pj'));
  }
  
 

  
  const [lastRefreshed, setLastRefreshed] = useLocalStorage("lastRefreshed", '');

  // When the button is clicked, update the time
  function refresh() {
    const currentDate= new Date();
    setLastRefreshed(currentDate.toLocaleString());
  }
  // console.log(parkingAreaSlots)
  // console.log(slotApi)
  // console.log(bookedRow)

  return (
    <React.Fragment>
      <Box sx={{ width: "90%", height: "5%", ml: '5%', mr: '5%', mt: '8%', borderRadius: '50%' }}>
        {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography sx={{ color: '#6F8191', fontSize: 17 }}>Parking</Typography>
          <Typography sx={{ color: '#6E7C9D', ml: '1%', fontSize: 17 }}>{'>'}</Typography>
          <Typography sx={{ color: '#222222', fontWeight: 'bold', ml: '1%', fontSize: 17 }}>{parkingAreaName}</Typography> */}
        {/* <Typography sx={{color:'black'}}>{data}</Typography> */}
        {/* </Box> */}
        <div role="presentation" onClick={handleClick}>
        <Breadcrumbs separator = '>' aria-label="breadcrumb">
        <Link href='/parkingDashboard' style={{ textDecoration: 'none', color: '#6F8191', fontSize:19 }}>
            Parking
          </Link>
          <Typography color="text.primary" sx={{fontSize:19}}>{parkingAreaName}</Typography>
        </Breadcrumbs>
        </div>
        <Paper variant="outlined" sx={{ my: { md: 1, lg: 3 }, p: { md: 2, lg: 3 } }}>
          <Box sx={{ display: 'flex', flexDireciton: 'row', ml: 2 }}>
            <Box sx={{ width: 550 }}>
              <Typography component="h3" variant="h3" align="left" sx={{ color: 'black', fontWeight: 'bold' }}>
                {parkingAreaName}
              </Typography>
            </Box>

            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
              sx={{ ml: "auto", borderColor: '#61B6EC', borderRadius: 2 }}
            >
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>
            </ToggleButton>
            <Button variant="outlined" sx={{ ml: 3, width: '100px', borderRadius: 2 }} onclick={routetoEditParking}>
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Edit</Typography>
            </Button>
            <Button variant="outlined" sx={{ ml: 3, width: '100px', borderRadius: 2 }}>
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Delete</Typography>
            </Button>

          </Box>


          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, ml: 2 }}>
            <Typography component="h6" variant="h6" sx={{ color: 'black' }} >
              Status
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Address
            </Typography>

          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
            <Box sx={{ width: 100 }}>
              {selected ? (<CircleIcon sx={{ fontSize: 10, color: 'grey', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)}
              <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
                {selected ? "Inactive" : "Active"}
              </Typography>
            </Box>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 5, color: 'grey' }} gutterBottom>
              {parkingAreaAddress}
            </Typography>

          </Box>
        </Paper>
      </Box>
      <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',pb:2}}>
      <Typography sx={{ fontWeight: 'bold', ml: '5%', color: 'black',fontSize:'17px' }}> Area floors</Typography>
      <Typography sx={{color:'black',fontSize:'17px',ml:'auto'}}>Last updated: {lastRefreshed.toLocaleString()}</Typography>
      <Button variant="outlined" onClick={refresh} sx={{fontSize:'17px',borderRadius: 2,color:"#61B6EC",ml:2,mr:10}} >Refresh now</Button>
      </Box>
      <Box sx={{ width: '90%', margin: 'auto' }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ backgroundColor: '#3D4E5D' }}
          >
            <Typography sx={{ color: 'white' }}>1F (1 slot/s)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer sx={{ width: '95%', margin: 'auto', my: '2%' }} component={Paper}>
              <Box sx={{ display: 'flex', flexDirection: 'row', ml: '2%', alignItems: 'center' }}>
                <FormControl variant="outlined">
                  <Input
                    id="input-with-icon-adornment"
                    placeholder='Type search here'
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Typography sx={{ color: 'black', ml: '5%' }}>Filter by:</Typography>
                <FormControl sx={{ my: 2, ml: 3.5, minWidth: '120px', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth-label"
                    value={filterActive}
                    onChange={handleChangeFilterActive}
                    label="Status"
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="text" sx={{ ml: 'auto',mr:2, textDecoration: 'underline', color: '#5BADFA', fontSize: 17 }}>+Add new slot</Button>
              </Box>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow >
                    <StyledTableCell sx={{ fontSize: 17 }}>Slot ID</StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontSize: 17 }}>Slot name</StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontSize: 17 }}>Status</StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontSize: 17 }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {bookedRow.map ((booked) => (
                     <StyledTableRow key={booked.slotId}>
                     <StyledTableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                       {/* <Link href='/parkingArea' style={{ textDecoration: 'none', color: 'black' }}>{row.slotId}</Link> */}
                       {booked.slotId}
                     </StyledTableCell>
                     <StyledTableCell align="left" sx={{ fontSize: 16 }}>{booked.slotName}</StyledTableCell>
                     <StyledTableCell align="left">
                       <Box sx={{ width: 200 }}>
                         <CircleIcon sx={{ fontSize: 10, color: '#FF0080', mt: 1 }} /> 
                         <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5 }} >
                           Booked
                         </Typography>
                       </Box>
                     </StyledTableCell>
                     <StyledTableCell align="left">
                       <Button variant="text" sx={{ textDecoration: 'underline', color: '#5BADFA', fontSize: 17 }}>Delete</Button>
                     </StyledTableCell>
                   </StyledTableRow>
                  ))}
                  {rows.map((row) => (
                    <StyledTableRow key={row.slotId}>
                      <StyledTableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                        {/* <Link href='/parkingArea' style={{ textDecoration: 'none', color: 'black' }}>{row.slotId}</Link> */}
                        {row.slotId}
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ fontSize: 16 }}>{row.slotName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Box sx={{ width: 200 }}>
                          <CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />
                          <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5 }} >
                            {row.status}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button variant="text" sx={{ textDecoration: 'underline', color: '#5BADFA', fontSize: 17 }}>Delete</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}

                 
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </React.Fragment>
  )
}
