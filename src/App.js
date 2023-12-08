import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import { useState } from 'react';
import { addMonths, format, subMonths, addDays,subDays} from "date-fns";

function App() {
  
  


  const handCom = (data) => {
    console.log('받아온 데이터',format(data,'d'));
  }

  return (
    <div>
      <Calender onSend = {handCom}/>
    </div>

  );
}

export default App;
