import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles-product';

function Product(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
        <Card className={classes.root}>
            <CardHeader
            title={props.name}
            subheader={props.price + String(' CLP')}
            />
            <CardMedia
            className={classes.media}
            image= {props.image}
            />
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
                {
                  props.technical_chars.map((element) => <Typography key = {element.id} paragraph>
                        - {element.key}  {element.value}
                      </Typography>)
                }
            </CardContent>
            <CardContent>
              <Typography paragraph>&#36; Métodos de pago:</Typography>
                {
                  props.payment_methods.map((element) => <Typography key = {element.id} paragraph>
                        - {element.name}
                      </Typography>)
                }
            </CardContent>
            </Collapse>
        </Card>
  );
}

export default Product;
