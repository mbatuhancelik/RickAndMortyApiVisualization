
import axios from 'axios'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import Wrapper from '../../components/styleWrapper';


export async function getServerSideProps({params}){

    
    var data = await axios.get("https://rickandmortyapi.com/api/location/" + params.location).then( response =>response.data).catch()
    var name = data.name
    
    var residents = data.residents
    residents = await Promise.all(residents.map( async link => (await axios.get(link).then( response =>response.data).catch())))
    

    
    return {props : {residents: residents, name: name}}
}

export default function locationResidents(props) {
    var residents = props.residents
    residents = Object.keys(residents).map((key) =>  residents[key]);
    return (
          <Wrapper>
            <Box sx={{ width: 7/10 }}>
            <Typography variant="h4" sx={{m:5}}>{props.name}</Typography>
                <Grid container spacing={2} >
                    {
                      residents.map(resident =>{
                        return(
                            <Grid item xs={4} key={resident.id}>
                                <Card  sx={{ ml: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={resident.image}
                                    alt="green iguana"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                      {resident.name}
                                    </Typography>
                                    <p>{resident.species}{resident.gender && resident.gender !== 'unknown' && '/' + resident.gender}</p>
                                    {getStatusIndicator(resident.status)}
                                    <p>{resident.origin.name}</p>
                                  </CardContent>
                                </Card>
                            </Grid>
                        )
                      })
                    }
                </Grid>
            </Box>
          </Wrapper>
    );
}
function getStatusIndicator(status){
 if(!status) return

 if(status === 'Alive'){
    return(
      <Chip label={status} color="success" variant="outlined" />
    )
 }else if(status ==='Dead'){
  return(
    <Chip label={status} color="error" variant="outlined" />
  )
 }else{
  return(
    <Chip label="Unknown" color="warning" variant="outlined" />
  )
 }
}