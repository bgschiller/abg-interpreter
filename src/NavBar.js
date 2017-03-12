import React from 'react';

const NavBar = () =>
    (<nav className="navbar navbar-inverse">
     <div className="container">
       <div className="navbar-header">
         <a className="navbar-brand" href="#">ABG Interpreter</a>
       </div>
       <div id="navbar" className="collapse navbar-collapse">
         <ul className="nav navbar-nav">
           <li className="active"><a href="#">Home</a></li>
         </ul>
       </div>
     </div>
    </nav>)

export default NavBar;
