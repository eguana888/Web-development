import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import {useEffect, useState} from 'react';
import { addMonths, format, subMonths, addDays,subDays} from "date-fns";
import ToDay from './ToDay';
import CurentMap from "./CurentMap";

function App() {
  const [getdate, setGetdata]=useState();
  const [check, setCheck]=useState(false);

  const [getwork, setGetwork] = useState();

  useEffect(() => {
    const existData = localStorage.getItem("TodayList");
    const storedData = existData ? JSON.parse(localStorage.getItem("TodayList")) : [];
    if (storedData) {
      setGetwork(storedData);
    }
  }, []);

  console.log("getwork",getwork);

  // const [promiss, setPromiss] = useState([]);

  const currentData = new Date().getDay();
  const handCom = (data) => {
    console.log('받아온 데이터',format(data,'yyyy-MM-dd'));
    setGetdata(data);
    setCheck(true);
  }
  // console.log(getwork);

  return (
    <div>
      <Calender onSend = {handCom}/>
      {check && <ToDay currentdata={currentData} today={getdate} getwork={getwork} setGetwork={setGetwork}/>}
    </div>

  );
}

export default App;
