import { addMonths, format, subMonths, addDays,subDays} from "date-fns";
import React, { useState } from "react";


const Header = ({CurrentDate,prevDate,NextDate}) => {
    

    return(
        <div style={{padding:10}}>
            <span style={{padding:10}}>
                <button onClick={prevDate}>이전</button>
            </span>
            <span >{format(CurrentDate,'yyyy')}.</span>
            <span>{format(CurrentDate,'M')}</span>
            <span style={{padding:10}}>
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

const Body = ({CurrentDate, list, check,handClick}) => {
    const mStart = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(),1);
    const mEnd = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth()+1,0);
    let sdayi = new Date(mStart);
    let edayi = new Date(mEnd);

    const sday = subDays(sdayi, sdayi.getDay());
    const eday = addDays(edayi, 6 - edayi.getDay());

    const same = (ta1, ta2) =>{
        return ta1.getFullYear() == ta2.getFullYear() &&ta1.getMonth() == ta2.getMonth() &&ta1.getDate() == ta2.getDate()
    }

    let a = 0;
    const cal = [];
    let days = [];
    let dayCount = [];
    let day = sday;
    let data = '';
    let cSty = {
        width: '200px',
        height: '50px',
        border: '2px solid #DDD',
        display: 'inline-block',
        magin: '5px',
        overflow: 'hidden'

    };

    while (day <= eday) {
        for (let i = 0; i < 7; i++) {
            let z = i + a;
            if(same(day,CurrentDate)){
                cSty = {
                    minWidth: '200px',
                    minHeight: '50px',
                    border: '2px solid #DDD',
                    display: 'inline-block',
                    magin: '5px',
                    backgroundColor: '#ffc9ce',
                    overflow: 'hidden'

                };
            }else if(day.getMonth() != CurrentDate.getMonth()){
                cSty = {
                    width: '200px',
                    height: '50px',
                    border: '2px solid #DDD',
                    display: 'inline-block',
                    magin: '5px',
                    backgroundColor: '#E5E5E5',
                    overflow: 'hidden'

                };
            }
            data = format(day, 'd');
            dayCount.push(day)
            days.push(
                
                <div style={cSty} onClick={()=>handClick(dayCount[z])}>
                    <div >
                        {data}
                        <br/>
                        {list.map(item =>{
                            if(same(day, item.CDate)){
                                return(
                                <span>
                                    {item.tilte}
                                </span>
                            )
                            }
                            return null;
                        })}
                    </div>
                </div>,
            );
            day = addDays(day, 1);
            cSty = {
                width: '200px',
                height: '50px',
                border: '2px solid #DDD',
                display: 'inline-block',
                magin: '5px',
                overflow: 'hidden'
        
            };
        }
        
        cal.push(
            <div >
                {days}
            </div>,
        );
        days = [];
        a = a+7;
    }
    return (<div>{cal}</div>);

}
function Calender(pro){
    const [CurrentDate, setCurrentDate] = useState(new Date());
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);

    
    const handClick = (day) =>{
        pro.onSend(day)
    }
    
    const prevDate = () => {
        
        setCurrentDate(subMonths(CurrentDate, 1));
    };
    const NextDate = () => {
        setCurrentDate(addMonths(CurrentDate, 1));
    };

    return(
        <div>
            <Header CurrentDate={CurrentDate} prevDate={prevDate} NextDate={NextDate} />
            <Week />
            <Body CurrentDate={CurrentDate} list={list} check={check} handClick = {handClick}/>

        </div>
        
    );

};

export default Calender;