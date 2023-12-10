import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import {useEffect, useState} from 'react';
import { addMonths, format, subMonths, addDays,subDays} from "date-fns";
import ToDay from './ToDay';


function App() {
  const [getdate, setGetdata]=useState();
  const [check, setCheck]=useState(false);

  const [getwork, setGetwork] = useState();
  const [getPromiss, setGetPromiss] = useState();

  useEffect(() => {
    const existData = localStorage.getItem("TodayList");
    const storedData = existData ? JSON.parse(localStorage.getItem("TodayList")) : [];
    if (storedData) {
      setGetwork(storedData);
    }
  }, []);

  useEffect(() => {
    const existData = localStorage.getItem("PromissList");
    const storedData = existData ? JSON.parse(localStorage.getItem("PromissList")) : [];
    if (storedData) {
      setGetPromiss(storedData);
    }
  }, []);

  const currentData = new Date().getDate();
  const handCom = (data) => {
    setGetdata(data);
    setCheck(!check);
  }

  return (
    <div>
      <Calender onSend = {handCom}/>
      {check && <ToDay style={{textAlign: "center"}} currentdata={currentData} today={getdate} getwork={getwork} setGetwork={setGetwork} getPromiss={getPromiss} setGetPromiss={setGetPromiss}/>}
    </div>

  );
}

export default App;
