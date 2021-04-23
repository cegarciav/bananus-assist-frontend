import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



export default function LoginForm (){
    
    return (
        <div>
            <Container maxWidth="sm">
                <Typography component="div"  >
                    <Grid container direction="column" alginItems='center' justify='center' spacing={3} >
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Usuario" variant="outlined" />
                        </Grid>
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Contraseña" type="password" variant="outlined" />
                        </Grid>

                        <Grid item alginItems='center'>
                            <Button color="primary" variant="contained">Ingresar</Button>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>         
        </div>
    );
}

