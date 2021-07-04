import React from 'react';
import {Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useStyles from './styles-routes';
import Navbar from '../components/Navbar/navbar';
import Backoffice from '../components/Backoffice';


export default function BackOfficeRoute({exact, path, props, ...rest}) {
    const classes = useStyles();
    const user = useSelector(selectUser);
    return (
        <Route 
            exact={exact} 
            path={path} {...rest}
            render={(props) =>
                    <>
                        <Navbar/>
                        {
                        user?
                            (
                            user.rol == "administrator" || user.rol == "supervisor"?
                                <Backoffice {...props}/>
                            :
                                <div className={classes.imageContainer}>
                                    <img src="https://wallpapercave.com/wp/wp4266697.png" alt="display image" />
                                </div>
                            )
                        :
                            <Redirect to="/login" />
                        }   
                    </>
                    }
        />
  );
}