import * as React from 'react';
import ServiceSetting from './ServiceSetting';
import Container from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography'


export default function EditServiceSetting (){
    return (
    //  <React.Fragment>
    <Container component="main" maxWidth="lg" sx={{mb: 2, ml:11,mt:'10%'}}>
        <Box sx={{display:'flex', flexDirection:'row'}}>
        <Typography sx={{color:'grey',fontSize:'21px'}}>Service setting</Typography>
        <Typography sx={{ml:'1%',fontWeight:'bold',color:'black',fontSize:'21px'}}> &gt; </Typography>
        <Typography sx={{ml:'1%',fontWeight:'bold',color:'black',fontSize:'21px'}}>Edit service details</Typography>
        </Box>
        <Typography  sx={{mt:'1%',fontWeight:'1000',color:'black',fontSize:'43px'}}>Edit service details</Typography>
        <Typography sx={{mt:'1%',color:'black',fontSize:'21px'}}>Fill out the fields below to edit service details</Typography>
        <ServiceSetting/>
    </Container>
    // {/* </React.Fragment>    */}
    )
}