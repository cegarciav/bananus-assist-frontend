import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useStyles from "./styles-information";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';







const qas = [
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
    title: 'Info 3',
    subtitle: 'Subtitle 3',
    description: 'descripcion 3',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
  {
    title: 'Info 4',
    subtitle: 'Subtitle 3',
    description: 'descripcion 3',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
  {
    title: 'Info 5',
    subtitle: 'Subtitle 5',
    description: 'descripcion 5',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
  {
    title: 'Info 6',
    subtitle: 'Subtitle 3',
    description: 'descripcion 5',
    img: 'https://online-shipping-blog.endicia.com/wp-content/uploads/2015/07/PWC-visual-online-shopping-international-e1438357488700-618x433.jpg'
  },
];


export default function Information() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
  
      <Container maxWidth="lg"  component ="Title" lassName={classes.titleContent}>
        <Typography variant="h3" align = "left" className={classes.infoTitle}>

        <InfoOutlinedIcon fontSize = "large" align = "left" className={classes.infoTitle}/>

          Informaciones
        </Typography>

        
      </Container>

      <Container maxWidth="lg" component="description" >
  
      <Typography align= "justify" variant = "subtitle1" className={classes.infoDescription}>
      Bananus assist es una plataforma que permite ofrecer asistencia y acompañar a los 
      clientes de manera remota en su proceso de compra. 
      De esta manera los clientes pueden comprar de manera segura minimizando el contacto físico.
        </Typography>
        
      </Container>


      <Container maxWidth="lg" component="how" >
      <Typography align= "justify" variant = "h5" className={classes.infoHow}>
      ¿Como funciona?
        </Typography>
        
      </Container>

      <Divider />

  <List component="nav"  aria-label="how-steps">
  <ListItem button>
    <ListItemText 
    primary="1" 
    secondary="En cada uno de los dispositivos de la tienda se encuentra disponible el catálogo de productos 
    en venta."
    />
  </ListItem>
  <Divider />
  <ListItem button>
    <ListItemText 
    primary="2" 
    secondary="Al momento de requerir asistencia, el cliente podrá solicitarla por medio del botón en la barra e navegación que dice “Solicitar asistencia”"
    />
  </ListItem>
  <Divider />
  <ListItem button>
    <ListItemText 
    primary="3" 
    secondary="En caso de haber asistentes disponibles, se desplegará un mensaje para que el 
    cliente se acerque al tablet central, en donde se podrá contactar por medio de una videollamada con 
    el asistente y resolver sus consultas."
    />
  </ListItem>
  <Divider  />
  <ListItem button>
    <ListItemText 
    primary="4" 
    secondary="Si no hay asistentes disponibles, se desplegará un mensaje informandole al cliente. 
    Este podrá continuar con su proceso de compra y cuando se desocupe el asistente solicitar que le asista."
    />
  </ListItem>
  <Divider  />
</List>

<div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Preguntas Frecuentes</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {qas.map((tier) => (
            
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
        </AccordionDetails>
      </Accordion>
    </div>
      

      
      
      

    </React.Fragment>
  );
}

