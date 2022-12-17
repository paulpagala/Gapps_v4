import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import question_logo_source from "../../public/question.svg";
import { useState } from 'react';

const questionmodal = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    var namevar = "username";
    var floor = "floor";
    var area = "parking area";
    
    const [contents, setContents] = useState([
        {title:'Switch Parking service to inactive?', body:'Making this service inactive will automatically disable all parking areas', id: 1 },
        {title:'Save changes?', body:'Are you sure you want to save changes made this ' +{namevar} , id: 2 },
        {title:'Delete '+ {namevar}, body:'Are you sure you want to remove ' + {namevar} + ' from the [parking area/area floor/slot] list?', id: 3 },
        {title:'Switch' +{floor} + 'to inactive?', body:'Making this floor inactive will automatically disable all slots', id: 4 },
        {title:'Switch '+{area}+' to inactive?', body:"Making this parking area inactive will automatically disable all floors and their slots", id: 5 }
    ]);


return (

      <Container component="main" maxWidth="lg" sx={{ mb: 2, ml: 11 }}>
  
          <React.Fragment>
            <Dialog
              // fullScreen
              fullScreen={fullScreen}
              open="true"
            //   onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              sx={{ backgroundColor: '#22222279', textAlign: 'center' }}
            >
              <Box sx={{ justifyContent: 'center', mt: 5 }}>
                <Image src={question_logo_source} alt="question_logo" width={135} height={135} />
              </Box>
              <DialogTitle id="responsive-dialog-title">
              {contents.map((content) => (
                <div key={content.id}>
                    <b><p>{content.title}</p></b>
                </div>
            ))}
              </DialogTitle>
              <DialogContent sx={{ pl: 5, pr: 5 }}>
                <DialogContentText sx={{fontSize:18}}>
                {contents.map((content) => (
                <div key={content.id}>
                    <p>{content.body}</p>
                </div>
            ))}
                 </DialogContentText>
              </DialogContent>
              {/* <DialogActions sx={{alignContent:'center'}} > */}
              {/* <Button autoFocus onClick={handleClose}>
                      Disagree
                    </Button> */}
              {/* <Button onClick={handleClose} autoFocus variant='contained' sx={{ backgroundColor: '#5BADFA', maxWidth: 200, mb: 5, ml: 21.5 }}>
               */}
               <div sx={{ display: "flex", direction: "row"}}>
               <Button autoFocus variant='outlined' sx={{ backgroundColor: '#FFF',  mb: 5 , width: '35%'}}>
                Cancel, go back
              </Button>
              <Button autoFocus variant='contained' sx={{ backgroundColor: '#5BADFA', mb: 5, ml: 2, width: '35%'}}>
                Proceed
              </Button>
              </div>
              {/* </DialogActions> */}
            </Dialog>
          </React.Fragment>
        </Container>
  );
}

export default questionmodal;