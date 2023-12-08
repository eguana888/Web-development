import React, {useEffect, useRef, useState} from "react";
import {addMonths, format, subMonths, addDays, subDays} from "date-fns";
import CurentMap from "./CurentMap";

// 하루의 일정을 선택할 수 있는 화면
export default function ToDay({currentdata ,today}){
    const [pageNum, setPagenum] = useState(0);
    const [work, setWork] = useState([]);
    const [promiss, setPromiss] = useState([]);


    //클릭시 날짜와 현재 날짜 비교해서 진우꺼 출력 시도 ==> 실패
    const clickDay = format(today, "dd");
    const [showToday, setShowToday] = useState(false);

    console.log("클릭",parseInt(clickDay));
    console.log("현재",currentdata);

    // useEffect(() => {
    //     setGetWork(work);
    // }, [work, setGetWork]);

    // useEffect(() => {
    //     setGetWork(work);
    //     if (clickDay === parseInt(today)) {
    //         setShowToday(true);
    //         console.log(showToday);
    //     }
    // }, []);


    return(
        <div style={{margin: "10px"}}>
            <h1 style={{paddingLeft: "10px"}}>{format(today, "yyyy-MM-dd")}일</h1>
            <div>
                <button  style={{margin: "10px"}} type={"button"} onClick={()=>setPagenum(1)} >할일</button>
                <button style={{margin: "10px"}} type={"button"} onClick={()=>setPagenum(2)}>약속</button>
                {showToday &&  <button style={{margin: "10px"}} type={"button"} onClick={()=>setPagenum(2)}>약속</button>}
                {pageNum === 1 && <TodayComponent todos={work} setTodos={setWork} ClickDay={clickDay}/>}
                {pageNum === 2 && <PromissComponent todos={promiss} setTodos={setPromiss} ClickDay={clickDay}/>}
            </div>
        </div>
    );
}

// "할일"을 선택했을때 동작하는 컴포넌트
const TodayComponent=({todos, setTodos, ClickDay})=>{


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
        }

        return (
            <div>
                <input type={"text"} placeholder={"할일"} ref={refTitle} onKeyPress={(event) => {
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
            <div>
                <span onClick={()=>onUpdate(todo.id, !todo.check)} style={{color: todo.check ? "Gray" : "Black"}}>
                    {todo.check ? "[✓]": "[X]"}{todo.title}
                </span>
                {todo.check ? null : <button onClick={()=>onDelet(todo.id)}>-</button>}
            </div>
        )
    }
    console.log(todos);
    return(
        <div>
            <TodayInput todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
            <TodayList todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
            <br/>
            <button type={"button"} onClick={()=>setTodos(todos)}>확인</button>
        </div>
    )
}



// "약속"을 클릭하면 동작함
const PromissComponent=({todos, setTodos, ClickDay})=>{
    // const [todos, setTodos] = useState([]);
    useEffect(() => {
        const fillterPromiss = todos.filter(todo => todo.ClickDay === ClickDay);
        setTodos(fillterPromiss);
    }, [ClickDay]);

    const PromissInput=({todos, setTodos})=> {
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [location, setLocation] = useState("");
        //const refContet = useRef(null);
        //const refLocation = useRef(null);

        const onAdd = (props) => {
            const id = todos.length>0 ? todos[todos.length - 1].id + 1 : 1;
            setTodos([...todos, {ClickDay ,id, title, content, location}]);
        }

        return (
            <div>
                <input type={"text"} placeholder={"제목"} onChange={(event) => {
                    setTitle(event.target.value);
                }} value={title}/><br/>
                <input type={"Tab"} placeholder={"내용"} onChange={(event) => {
                    setContent(event.target.value);
                }} value={content}/><br/>
                <input type={"text"} placeholder={"장소(구체적으로)"}  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        if (title.trim() !== "" && content.trim() !== "" && location.trim() !== "") {
                            onAdd(location);
                            setTitle("");
                            setContent("");
                            setLocation("");
                        }
                    }
                }} onChange={(event) => {
                    setLocation(event.target.value);
                }} value={location}/>
            </div>
        )
    }
// Promiss 할일을 보여줌
    const PromissList = ({todos, setTodos}) => {
        console.log(todos);
        return (
            todos.map((todo) => (
                <div style={{border: "1px solid black", margin: "10px", padding: "5px"}}>
                    <PromissItem ClickDay={ClickDay} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
                </div>
            ))
        );
    };
// Promiss 할일의 객체
    const PromissItem=({todo, todos, setTodos})=>{
        const onUpdate=(id)=>{
            setTodos(todos.map((todo) => {
                if (todo.id == id) return {...todo}
                return todo;
            }));
        }
        return(
            <div>
                <div onClick={()=>onUpdate(todo.id)} style={{color: "Gray"}}>
                    제목: {todo.title}
                </div>
                <div>
                    내용: {todo.content}
                </div>
                <div>
                    장소: {todo.location}
                </div>
                <CurentMap address={todo.location}/>
            </div>
        )
    }
    return(
        <div>
            <div>
                <PromissInput todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
                <PromissList todos={todos} setTodos={setTodos} ClickDay={ClickDay}/>
            </div>
            <br/>
            <button type={"button"}>확인</button>
        </div>
    )
}