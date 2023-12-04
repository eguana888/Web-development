import { addMonths, format, subMonths, addDays,subDays, getFullYear} from "date-fns";
import React, { useState } from "react";


const Header = ({CurrentDate,prevDate,NextDate}) => {
    

    return(
        <div >
            <span>
                <button onClick={prevDate}>이전</button>
            </span>
            <span>{format(CurrentDate,'yyyy')}.</span>
            <span>{format(CurrentDate,'M')}</span>
            <span>
                <button onClick={NextDate}>이후</button>
            </span>
        </div>
    );
};

const Week = () => {
    

    const cSty = {
        width: '200px',
        height: '50px',
        borderRadius: '10px',
        border: '2px solid #DDD',
        top: '50%',
        left: '50%'

    };

    const date = ['일요일', '월요일', '화요일','수요일','목요일','금요일','토요일']

    const dayRender = () => {
        const day = [];
        for(let i =0; i<7; i++){
            day.push(<td style={cSty}>{date[i] + ' '}</td>)
        }
        return day;
    }

    


    return(
        
        <table>
            <tr>
                {dayRender()}
            </tr>
        </table>
        
    )
}

const Body = ({CurrentDate,list,onDay}) => {
    const mStart = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(),1);
    const mEnd = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth()+1,0);
    let sdayi = new Date(mStart);
    let edayi = new Date(mEnd);

    const sday = subDays(sdayi, sdayi.getDay());
    const eday = addDays(edayi, 6 - edayi.getDay());


    const same = (ta1, ta2) =>{
        return ta1.getFullYear() == ta2.getFullYear() &&ta1.getMonth() == ta2.getMonth() &&ta1.getDate() == ta2.getDate()
    }


    
      

    const cal = [];
    let days = [];
    let day = sday;
    let data = '';
    let cSty = {
        width: '200px',
        height: '50px',
        border: '2px solid #DDD',
        display: 'inline-block',
        magin: '5px'

    };

    while (day <= eday) {
        for (let i = 0; i < 7; i++) {
            if(same(day,CurrentDate)){
                cSty = {
                    width: '200px',
                    height: '50px',
                    border: '2px solid #DDD',
                    display: 'inline-block',
                    magin: '5px',
                    color: 'red'
                };
            }
            data = format(day, 'd');
            days.push(
                <div style={cSty}
                onClick={()=> onDay(list)}>
                    <span>
                        {data}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
            cSty = {
                width: '200px',
                height: '50px',
                border: '2px solid #DDD',
                display: 'inline-block',
                magin: '5px'
        
            };
        }
        
        cal.push(
            <div >
                {days}
            </div>,
        );
        days = [];
    }
    return <div>{cal}</div>;
    

}







function Calender(){
    const [CurrentDate, setCurrentDate] = useState(new Date());
    const [list, setList] = useState([{CDate: CurrentDate, tilte: '예: 과제 끝내기', check: false}]);






    const prevDate = () => {
        
        setCurrentDate(subMonths(CurrentDate, 1));
    };
    const NextDate = () => {
        setCurrentDate(addMonths(CurrentDate, 1));
    };

    const onDay = (list,CurrentDate) =>{
        
    }

    return(
        <div>
            <Header CurrentDate = {CurrentDate} prevDate = {prevDate} NextDate = {NextDate}/>
            <Week/>
            <Body CurrentDate = {CurrentDate} list = {list} onDay = {onDay}/>
        </div>
    );

};

export default Calender;