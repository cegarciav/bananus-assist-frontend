import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: "#195E6D"
      
  },


}));

const tiers = [
  {
    title: 'Info 1',
    subtitle: 'Subtitle 1',
    description: 'descripcion 1',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'

  },
  {
    title: 'Info 2',
    subtitle: 'Subtitle 2',
    description: 'descripcion 2',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
  {
    title: 'Info 2',
    subtitle: 'Subtitle 2',
    description: 'descripcion 2',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
];


export default function Information() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
   
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Información
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Insertar descricipción general bananus assist.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            
            <Grid item  xs={12} sm={6} md={4}>
             

    <Card className={classes.root}>
      
        <CardMedia
          component="img"
          height="110"
          image={tier.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tier.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tier.description}
          </Typography>
        </CardContent>
      
      <CardActions>

        <Button size="small" color="primary">
          Ver Más
        </Button>
      </CardActions>
    </Card>

              
            </Grid>
          ))}
        </Grid>
      </Container>
      

    </React.Fragment>
  );
}

