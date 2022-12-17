import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { Link } from '@mui/material';
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import copy_logo from "/public/clone,-copy,-document,-file.svg";
import Image from 'next/image'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
//
import useLocalStorage from '../hooks/useLocalStorage';
import Router, { useRouter } from 'next/router';
import { useGlobalContext } from '../context/global';



export default function PolicyDetails() {
  const {setParkingAreaName,setParkingAreaAddress,setParkingAreaFloor,setParkingAreaSlots,setParkingSlotNames} = useGlobalContext();
  const [addParking, setAddParking] = React.useState('');

  const handleChangeAddParking = (event) => {
    setAddParking(event.target.value);
  };

  const [parkingArea, setParkingArea] = React.useState('');

  const handleChangeParkingArea = (event) => {
    setParkingArea(event.target.value);
    setParkingAreaName(event.target.value)
  };

  const [changeAddress, setChangeAddress] = React.useState('');

  const handleChangeAddress = (event) => {
    setChangeAddress(event.target.value);
    setParkingAreaAddress(event.target.value);
  };

  const [areaFloor, setAreaFloor] = React.useState('');

  const handleChangeAreaFloor = (event) => {
    setAreaFloor(event.target.value);
    setParkingAreaFloor(event.target.value)
  };

  const [numberOfSlots, setNumberOfSlots] = React.useState('');

  //for integer checking
  const [error, setError] = React.useState(false);
  const handleChangeNumberOfSlots = (event) => {
    setNumberOfSlots(event.target.value);
    setParkingAreaSlots(event.target.value)
    if (!Number.isInteger(Number(event.target.value))) {
      setError(true);
    } else {
      setError(false);
    }
  };


  //To add name to slots
  const [state, setState] = React.useState({
    slots: false,
  });

  const handleChangeSlots = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { slots } = state;

  const array = [];
  for (let i = 1; i <= numberOfSlots; i++) {
    // Add each number to the array
    array.push(i);
  }

    const [fieldValues, setFieldValues] = React.useState([]);

    // Function to handle changes to the text field values
    const handleFieldValuesChange = (index, event) => {
      // Create a copy of the field values array
      const newFieldValues = [...fieldValues];

      // Update the value at the specified index
      newFieldValues[index] = event.target.value;

      // Update the state variable with the new field values array
      setFieldValues(newFieldValues);
      setParkingSlotNames(newFieldValues);
    };
    // Use the map method to create TextField components
    let textFields = array.map((value, index) => (
      <Box key={index} sx={{ mb: 3, display: 'flex', flexDirection: "column", alignItems: 'left', alignContent: 'stretch', ml: 2 }}>
        <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Slot name {index + 1}</Typography>
        <TextField
          key={index + 1}
          onChange={(event) => handleFieldValuesChange(index, event)}
          variant="outlined"
          sx={{ backgroundColor: 'white', width: 326 }}
          placeholder="Enter Slot Name"
        />
      </Box>
    ));

  const duplicates = fieldValues.filter((value, index) => fieldValues.indexOf(value) !== index);

  const seenValues = {};

  // Create an array to store the indexes of duplicate elements and their original index
  const duplicateIndexes = [];

  // Loop over array elements
  for (let i = 0; i < fieldValues.length; i++) {
    const element = fieldValues[i];

    // If the element has already been seen, add the index and the original index to the array
    if (seenValues[element]) {
      duplicateIndexes.push([i, seenValues[element]]);
    } else {
      // Otherwise, add the element to the object so we know it has been seen
      seenValues[element] = i;
    }
  }


  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      'excel': ['.xlsx', '.xls'],
      'csv': ['.csv'],
    }
  });

  const files = acceptedFiles.map(file => (

    <li key={file.path} style={{ borderStyle: 'solid', borderRadius: 7, borderColor: '#C8D7E2', backgroundColor: '#EFF9FF', color: 'black', fontSize: 18, padding: 12, display: 'block', maxWidth: '45%' }}>
      <Image src={copy_logo} alt="copy_logo" width={'15%'} height={'15%'} /> {file.path} <span class="close" style={{ marginLeft: '30%', cursor: 'pointer' }}>&times;</span>
    </li>

  ));

  var closebtns = document.getElementsByClassName("close");
  var i;

  for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function () {
      this.parentElement.style.display = 'none';
    });
  }


  return (
    <React.Fragment>
      <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box>
          <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Parking areas & slots</Typography>
          <Typography sx={{ ml: 3, mt: 2 }}>Select how you will add your parking areas</Typography>
        </Box>
        <FormControl sx={{ ml: 3, display: 'block' }}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={addParking}
            onChange={handleChangeAddParking}
          >
            <FormControlLabel value="list" control={<Radio />} label="List Manually" />
            <FormControlLabel value="bulk" control={<Radio />} label="Upload bulk list" />
          </RadioGroup>
        </FormControl>
      </Paper>


      {addParking === "list" ?
        (
          <div>
            <Paper variant="outlined" sx={{ my: { md: 0, lg: 0 }, p: { md: 2, lg: 3 } }}>
              <Box sx={{ ml: 3 }}>
                <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom> Parking area name </Typography>
                <TextField
                  id="outlined-address"
                  // label="Address (optional)"
                  value={parkingArea}
                  onChange={handleChangeParkingArea}
                  variant="outlined"
                  sx={{ width: 500 }}
                  placeholder="Enter parking area name"
                />
              </Box>
              <Box sx={{ ml: 3, mt: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom> Address <em>(optional)</em></Typography>
                <TextField
                  id="outlined-parkingarea"
                  // label="Address (optional)"
                  value={changeAddress}
                  onChange={handleChangeAddress}
                  variant="outlined"
                  sx={{ width: 900 }}
                  placeholder="Enter address"
                />
              </Box>

              <Paper variant="outlined" sx={{ mr: 3, ml: 3, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
                <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Area Floor</Typography>
                <TextField
                  id="outlined-AreaFloor"
                  // label="Area Floor"
                  value={areaFloor}
                  onChange={handleChangeAreaFloor}
                  variant="outlined"
                  placeholder="E.g. P1"
                  sx={{ backgroundColor: '#FFFFFF' }}

                />

                <Typography variant="subtitle1" sx={{ color: 'black' }} gutterBottom>Number of slots</Typography>
                <TextField
                  id="outlined-number"
                  // label="Number of Slots"
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={numberOfSlots}
                  onChange={handleChangeNumberOfSlots}
                  error={error}
                  helperText={error ? 'Please enter a valid amount' : ''}
                  sx={{ backgroundColor: '#FFFFFF' }}
                  inputProps={{ min: 0 }}
                  placeholder="0"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox checked={slots} onChange={handleChangeSlots} name="slots" />
                  }
                  label="Add name to slots"
                />

                {slots ? (
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ backgroundColor: '#333E5D' }}
                    >
                      <Typography sx={{ color: 'white' }}>{areaFloor} slot names</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper variant="outlined" sx={{ mr: 5, ml: 5, my: { md: 1, lg: 3 }, p: { md: 2, lg: 3 }, backgroundColor: '#EFEFEF' }}>
                        {textFields}
                        <Box sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                          {duplicates.length > 0 && <Typography>There are duplicate values in the slot names!</Typography>}
                          {/* {duplicateIndexes} */}
                          {/* {duplicates} */}
                        </Box>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>)
                  :
                  null}

              </Paper>


            </Paper>


          </div>
        )
        : null
      }



      {addParking === 'bulk' ?
        (
          <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
            <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
              Upload list of available parking areas
            </Typography>
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'grey', display: 'block' }} gutterBottom>
              Missed the parking areas list template we shared?
            </Typography>
            <Link href='google.com'>Download template</Link>
            <Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
              <Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', borderStyle: 'dashed', borderRadius: 1, borderColor: 'darkgray' }}>
                <center>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drop your file here to upload or</p>
                    <button type="button" onClick={open} style={{ borderStyle: 'solid', borderRadius: 6, borderColor: '#5BADFA', backgroundColor: 'white', color: 'black', fontSize: 15, padding: 12, color: '#5BADFA' }}>
                      Select file from computer
                    </button>
                  </div>
                </center>
              </Paper>
            </Paper>

            <aside>
              <Typography sx={{ ml: 5, mt: 2 }}>File uploaded</Typography>
              <ul>{files}</ul>
            </aside>

          </Paper>)
        : null
      }

    </React.Fragment>
  );
}