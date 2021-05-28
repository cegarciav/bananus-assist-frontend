import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { CardHeader } from '@material-ui/core';
import useStyles from './styles-information';

const qas = [
  {
    title: 'Pregunta 1',
    description: 'respuesta 1',
  },
  {
    title: 'Pregunta 2',
    description: 'respuesta 2',
  },
  {
    title: 'Pregunta 3',
    description: 'respuesta 3',
  },
  {
    title: 'Pregunta 4',
    description: 'respuesta 3',
  },
  {
    title: 'Pregunta 5',
    description: 'respuesta 5',
  },
  {
    title: 'Pregunta 6',
    description: 'respuesta 6',
  },
];

const steps = [
  {
    title: '1.',
    description: 'En cada uno de los dispositivos de la tienda se encuentra disponible el catálogo de productos en venta.',
    img: 'https://res.cloudinary.com/pethelp/image/upload/v1621734566/how-1_l4igap.png',

  },
  {
    title: '2.',
    description: 'Al momento de requerir asistencia, el cliente podrá solicitarla por medio del botón en la barra de navegación que dice “Solicitar asistencia”',
    img: 'https://res.cloudinary.com/pethelp/image/upload/v1621734566/how-2_kpu1oy.png',
  },
  {
    title: '3.',
    description: 'En caso de haber asistentes disponibles, se desplegará un mensaje para que el cliente se acerque al tablet central, en donde se podrá contactar por medio de una videollamada con el asistente y resolver sus consultas.',
    img: 'https://res.cloudinary.com/pethelp/image/upload/v1621734566/how-3_y58ysg.png',
  },
  {
    title: '4.',
    description: 'Si no hay asistentes disponibles, se desplegará un mensaje informandole al cliente. Este podrá continuar con su proceso de compra y cuando se desocupe el asistente solicitar que le asista.',
    img: 'https://res.cloudinary.com/pethelp/image/upload/v1621734565/how-4_ugcllu.png',
  },
];

export default function Information() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
      </head>

      <Container maxWidth="lg" component ="Title" >
        <Typography variant="h3" className={classes.infoTitle}>
        <InfoOutlinedIcon fontSize = "large" align = "center" />
          Informaciones
        </Typography>
      </Container>

      <Container maxWidth="lg" component="description" >
        <Typography variant="body1" className={classes.infoDescription}>
          Bananus assist es una plataforma que permite ofrecer asistencia y acompañar a los
           clientes de manera remota en su proceso de compra.
           De esta manera los clientes pueden comprar de manera
           segura minimizando el contacto físico.
        </Typography>
      </Container>

      <Container maxWidth="lg" component="how" >
        <Typography align= "justify" variant = "h5" className={classes.infoHow}>
          ¿Cómo funciona?
        </Typography>
      </Container>

      <Container component="steps" >
        <Divider className={classes.dividerLine}/>
          {steps.map((step, key) => (
            <div key={key}>
              <Grid container spacing={3}>
                <Grid item xs={1} sm={1} md={1}>
                  <Typography align= "left" variant = "h4" className={classes.stepTitle}>
                    {step.title}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={9} md={9}>
                  <Typography align= "left" variant = "body1" className={classes.stepDescription}>
                    {step.description}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2} md={2}>
                  <Paper elevation={0} className = {classes.stepImagePaper}>
                    <img alt = "" src={step.img} className = {classes.stepImage}/>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          ))}
        <Divider />
      </Container>

      <div className={classes.root}>
        <Container maxWidth="lg" component="main" className={classes.pf}>
          <Typography align= "justify" variant = "h5" className={classes.infoHow}>
            Preguntas frecuentes
          </Typography>
        </Container>
        <Container maxWidth="lg" component="main" className={classes.gridPf}>

          <Grid container spacing={4} alignItems="flex-end">
            {qas.map((tier, key) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card className={classes.root}>
                  <CardHeader
                    title={tier.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tier.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
