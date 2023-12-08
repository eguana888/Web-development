import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import CurentMap from "./CurentMap";
import ToDay from "./ToDay";
import {useState} from "react";

function App() {
  return (
      <ToDay today={26}/>
  );
}

export default App;
