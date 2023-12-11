import React, {useEffect, useRef, useState} from "react";
import {addMonths, format, subMonths, addDays, subDays} from "date-fns";
import CurentMap from "./CurentMap";
import Diary from "./diary";
import Stopwatch from "./Stopwatch";
import "./Today.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button} from "react-bootstrap";
// 하루의 일정을 선택할 수 있는 화면
export default function ToDay({currentdata ,today, getwork, setGetwork, getPromiss, setGetPromiss}){
    const [pageNum, setPagenum] = useState(0);
    const [work, setWork] = useState(getwork.flat());
    const [promiss, setPromiss] = useState(getPromiss.flat());


    // 민성이 클릭 날짜 받기
    const clickDay = format(today, "dd");
    // 진우가 수정한 const
    const [showToday, setShowToday] = useState(false);
    const [diaryContent, setDiaryContent] = useState("");

    useEffect(() => {
        if (parseInt(clickDay) === currentdata) {
            setShowToday(true);
        } else {
            setShowToday(false);
        }
    }, [clickDay, currentdata]);

    const onSaveDiary = (content) => {
        const diaryData = {
            date: format(today, "yyyy-MM-dd"),
            content: content,
        };
        const existingDiary = JSON.parse(localStorage.getItem("Diary")) || [];
        const existingDiaryIndex = existingDiary.findIndex(
            (diary) => diary.date === diaryData.date
        );
        if (existingDiaryIndex != -1) {
            existingDiary[existingDiaryIndex] = diaryData;
        } else {
            existingDiary.push(diaryData);
        }

        localStorage.setItem("Diary", JSON.stringify(existingDiary));
    };

    // localStorage에 데이터 추가하는 함수
    const addToLocalStorage = (key, value) => {
        const existData = localStorage.getItem(key);
        const newData = existData ? JSON.parse(existData) : [];

        newData.push(value);
        localStorage.setItem(key, JSON.stringify(newData));
    }
    return(
        <div className="MainArea">
            <h1 style={{paddingLeft: "10px"}}>{format(today, "yyyy-MM-dd")}일</h1>
            <div>
                <Button variant="primary" className="firstButton" type={"button"} onClick={()=>setPagenum(1)} >할일</Button>
                <Button variant="primary" className="firstButton" type={"button"} onClick={()=>setPagenum(2)}>약속</Button>
                {showToday &&  <Button variant="secondary" className="firstButton" type={"button"} onClick={()=> {
                    setPagenum(3);
                }}>스톱워치(공부시간 측정)</Button>}
                {<Button variant="warning" className="firstButton" type={"button"} onClick={()=> {
                    setPagenum(4);
                }}>일기장</Button>}
                {pageNum === 1 && <TodayComponent todos={work} setTodos={setWork} ClickDay={clickDay}
                                                  setGetwork={setGetwork} local={addToLocalStorage}/>}
                {pageNum === 2 && <PromissComponent todos={promiss} setTodos={setPromiss} ClickDay={clickDay} setGetPromiss={setGetPromiss} local={addToLocalStorage}/>}
                {pageNum === 3 && <Stopwatch/>}
                {pageNum === 4 && <Diary onSaveDiary={onSaveDiary} diaryContent={diaryContent} setDiary={setDiaryContent}/>}
            </div>
        </div>
    );
}

// "할일"을 선택했을때 동작하는 컴포넌트
const TodayComponent=({todos, setTodos, ClickDay, local, setGetwork})=>{

    useEffect(() => {
        const fillterWork = todos.filter(todo => todo.ClickDay === ClickDay);
        setTodos(fillterWork)
    }, [ClickDay]);

    const TodayInput=({todos, setTodos})=> {
        const [title, setTitle] = useState("");
        const refTitle = useRef(null);

        const onAdd = (title) => {
            const id = todos.length>0 ? todos[todos.length - 1].id + 1 : 1;
            setTodos([...todos, {  ClickDay ,id, title, check: false}]);
            //setGetwork([...todos, {ClickDay, id, title}]);
        }
        return (
            <div>
                <input className="inputStyle" type={"text"} placeholder={"할일"} ref={refTitle} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        onAdd(title);
                        setTitle("");
                        refTitle.current.focus();
                    }
                }} onChange={(event) => {
                    setTitle(event.target.value);
                }} value={title}/>
            </div>
        )
    }

    // Today의 할일을 보여줌
    const TodayList = ({todos, setTodos}) => {
        return (
            todos.map((todo) => (
                <TodayItem ClickDay={ClickDay} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
            ))
        );
    };
// Today의 할일의 객체
    const TodayItem=({todo, todos, setTodos})=>{
        const onDelet=(id)=>{
            setTodos(todos.filter((todo) => todo.id !== id));}
        const onUpdate=(id, check)=>{
            setTodos(todos.map((todo) => {
                if (todo.id === id) return {...todo, check}
                return todo;
            }));
        }
        return(
            <div className="buttonContainer" >
                <span className="inputTextStyle" onClick={()=>onUpdate(todo.id, !todo.check)} style={{
                    color: todo.check ? "Gray" : "Black",
                    textDecoration: todo.check ? "line-through" : ""
                }}>
                    {todo.title}
                </span>
                {todo.check ? null : <Button variant="danger" onClick={()=>onDelet(todo.id)}> - </Button>}
            </div>
        )
    }


    const localName = "TodayList";
    return (
        <div>
            <TodayInput todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
            <TodayList todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
            <br/>
            <Button variant="success" className="firstButton" type={"button"} onClick={()=> {
                local(localName, todos.flat());
                setGetwork(JSON.parse(localStorage.getItem(localName)));
            }
            }>확인
            </Button>
            <Button variant="danger" className="firstButton" onClick={()=>{localStorage.removeItem("TodayList")}}>초기화</Button>
        </div>
    );
}



// "약속"을 클릭하면 동작함
const PromissComponent=({todos, setTodos, ClickDay, local, setGetPromiss})=> {
    useEffect(() => {
        const fillterPromiss = todos.filter(todo => todo.ClickDay === ClickDay);
        setTodos(fillterPromiss);
    }, [ClickDay]);

    const PromissInput = ({todos, setTodos}) => {
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [location, setLocation] = useState("");


        const onAdd = () => {
            if (title.trim() !== "" && content.trim() !== "" && location.trim() !== "") {
                const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
                setTodos([...todos, {ClickDay, id, title, content, location}]);
                setTitle("");
                setContent("");
                setLocation("");
            }
            // const id = todos.length>0 ? todos[todos.length - 1].id + 1 : 1;
            // setTodos([...todos, {ClickDay ,id, title, content, location}]);
        }

        return (
            <div>
                <input className="inputStyle" type={"text"} placeholder={"제목"} onChange={(event) => {
                    setTitle(event.target.value);
                }} value={title}/><br/>
                <input className="inputStyle" type={"text"} placeholder={"내용"} onChange={(event) => {
                    setContent(event.target.value);
                }} value={content}/><br/>
                <input className="inputStyle" type={"text"} placeholder={"장소(구체적으로)"} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        onAdd();
                    }
                }} onChange={(event) => {
                    setLocation(event.target.value);
                }} value={location}/>
            </div>
        )
    }
// Promiss 할일을 보여줌
    const PromissList = ({todos, setTodos}) => {
        return (
            todos.map((todo) => (
                <div className="promissList">
                    <PromissItem ClickDay={ClickDay} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
                </div>
            ))
        );
    };
// Promiss 할일의 객체
    const PromissItem = ({todo, todos, setTodos}) => {
        return (
            <div className="promissContainer">
                <div>
                    <label className="LabelStyle">제목 : </label> {todo.title}
                </div>
                <div>
                    <label className="LabelStyle">내용 : </label> {todo.content}
                </div>
                <div>
                    <label className="LabelStyle">장소 : </label> {todo.location}
                </div>
                <CurentMap address={todo.location}/>
            </div>
        )
    }
    const localName = "PromissList"
    return (
        <div>
            <div>
                <PromissInput todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
                <div  className="promissTotalContainer" >
                    <PromissList todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
                </div>
            </div>
            <br/>
            <Button variant="success" className="firstButton" onClick={() => {
                local(localName, todos.flat());
                setGetPromiss(JSON.parse(localStorage.getItem(localName)));
            }}>확인
            </Button>
            <Button variant="danger" className="firstButton" onClick={()=>{localStorage.removeItem("PromissList")}}>초기화</Button>

        </div>
    )
}