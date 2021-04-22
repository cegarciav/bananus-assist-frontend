import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
	return (
        <div >
            <div> 
                <Link to='/Catalog'> Catálogo </Link>
                <Link to='/Home'> Home </Link>
            </div>
        </div>
	    );
	}

export default Navbar;