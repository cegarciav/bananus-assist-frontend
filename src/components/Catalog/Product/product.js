import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    maxWidth:'70%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '40px',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  product: {
    marginLeft: '00px'
  }
}));

function Product(props) {
  const [spacing] = React.useState(1);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
        <Card className={classes.root}>
            <CardHeader
            title="MacBook Pro 13 (M1)"
            />
            <CardMedia
            className={classes.media}
            image="https://d3tctca4ed2xlu.cloudfront.net/images/spree/images/834734/attachments/large/Apple_MacBook_Pro_M1_Space_Gray_1.jpg?1608666218"
            title="MacBook Pro 13 (M1)"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                El chip M1 de Apple redefine al Macbook Pro de 13 pulgadas.1 Viene con una CPU de 8 núcleos que permite un rendimiento óptimo en los flujos de trabajo más exigentes, como fotografía, programación y edición de video. 
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <Typography variant="body2" color="textSecondary" component="h2" className={classes.product}>
               Ver más
            </Typography>
            <IconButton
                className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Información técnica:</Typography>
                <Typography paragraph>
                  - Chip M1 de Apple que permite un gran avance en el rendimiento de la CPU, GPU y aprendizaje automático
                </Typography>
                <Typography paragraph>
                  - La mayor duración de batería en un Mac: hasta 20 horas para que puedas hacer mucho más2
                </Typography>
                <Typography paragraph>
                  - CPU de 8 núcleos que ofrece un rendimiento hasta 2,8 veces más rápido para ejecutar flujos de trabajo a una velocidad increíble1
                </Typography>
                <Typography paragraph>
                  - GPU de 8 núcleos con gráficas hasta 5 veces más veloces para apps y juegos con gráficas avanzadas2
                </Typography>
            </CardContent>
            </Collapse>
        </Card>
  );
}

export default Product;
