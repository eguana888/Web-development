import { addMonths, format, subMonths, addDays,subDays} from "date-fns";
import React, { useState } from "react";

const Header = ({CurrentDate,prevDate,NextDate}) => {
    return(
        <div>
            <span>{format(CurrentDate,'yyyy')}.</span>
            <span>{format(CurrentDate,'M')}</span>
            <span>
                <button onClick={prevDate}>이전</button>
                <button onClick={NextDate}>이후</button>
            </span>
        </div>
    );
};
const Week = () => {
    
    const date = ['일요일', '월요일', '화요일','수요일','목요일','금요일','토요일']

    const dayRender = () => {
        const day = [];
        for(let i =0; i<7; i++){
            day.push(<td>{date[i] + '/'}</td>)
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

const Body = ({CurrentDate}) => {
    const mStart = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(),1);
    const mEnd = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(+1, 0));
    let sdayi = new Date(mStart);
    let edayi = new Date(mEnd);

    const sday = subDays(sdayi, sdayi.getDay());
    const eday = addDays(edayi, 6 - edayi.getDay());

    

    

    const rows = [];
    let days = [];
    let day = sday;
    let formattedDate = '';

    while (day <= eday) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            days.push(
                <div style={{ display: 'inline-block', margin:'5px' }}
                onClick={()=> {}}>
                    <span>
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div >
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
    

}

export default function Calender(){
    const [CurrentDate, setCurrentDate] = useState(new Date());

    const prevDate = () => {
        
        setCurrentDate(subMonths(CurrentDate, 1));
    };
    const NextDate = () => {
        setCurrentDate(addMonths(CurrentDate, 1));
    };

    const onDay = () =>{
            
    }
    return(
        <div>
            <Header CurrentDate = {CurrentDate} prevDate = {prevDate} NextDate = {NextDate}/>
            <Week/>
            <Body CurrentDate = {CurrentDate}/>
        </div>
    );
};