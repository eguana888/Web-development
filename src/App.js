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

  // ToDay의 배열을 부모에 놓고 부모에서 받아서 수정으로 변경
  // const [getwork, setGetWork] = useState([]);
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
      {check && <ToDay currentdata={currentData} today={getdate} />}
    </div>

  );
}

export default App;
