import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import { useState } from 'react';
import { addMonths, format, subMonths, addDays,subDays} from "date-fns";
import ToDay from './ToDay';
import CurentMap from "./CurentMap";

function App() {
  const [getdate, setGetdata]=useState();
  const [check, setCheck]=useState(false);


  const handCom = (data) => {
    console.log('받아온 데이터',format(data,'d'));
    setGetdata(data);
    setCheck(true);
  }
  const handComCOm = (data) =>{
    console.log('받아온 데이터',data);
  }

  return (
    <div>
      <Calender onSend = {handCom}/>
      {check && <ToDay today={getdate} onSend = {handComCOm}/>}
    </div>

  );
}

export default App;
