import React from 'react';
import {Route} from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import Information from '../components/Information/information';


export default function InformationRoute({exact, path, props, ...rest}) {
    return (
        <Route 
            exact={exact} 
            path={path} {...rest}
            render={(props) =>
                    <>
                        <Navbar/>
                        <Information {...props}/>   
                    </>
                    }
        />
  );
}