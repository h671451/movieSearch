import React from "react";
import {createRoot} from 'react-dom/client'
import App from './Components/App'; // importerer objektet app 


const container = document.getElementById('root'); // here you have selected the html file and the react application will be based on this html file. you have probaly a div
// where the ID =  root. this means that the react til replace the content of the div with react components.
const root = createRoot(container);

root.render(<App />); //here you render the app component whith in the container which is in the the html. 
//this means that the component app will be displayed in the root element of your HTML.