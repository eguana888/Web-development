import React, { useState, useEffect, useRef } from "react";
import "./Timerstyle.css"
const TimerBox = () => {
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [milliSecond, setMilliSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleBtnName, setToggleBtnName] = useState("시작");
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const startTimeRef = useRef(0);
    const leftTimeRef = useRef(0);

    useEffect(() => {
        minuteCalculator();
        if (timer <= 0) {
            setToggleTimer(false);
            setIsTimerRunning(false);
            setTimer(0);
        }
    }, [timer]);

    useEffect(() => {
        if (toggleTimer) {
            startTimeRef.current = Date.now();
            leftTimeRef.current = timer;
            setIsTimerRunning(true);
        } else if (!toggleTimer || timer < 0) {
            // setIsTimerRunning(false);
        }
    }, [toggleTimer]);

    useEffect(() => {
        if (!isTimerRunning) {
            addTime(1);
            setToggleBtnName("시작");
        } else if (isTimerRunning && !toggleTimer) {
            setToggleBtnName("다시시작");
        } else if (isTimerRunning && toggleTimer) {
            setToggleBtnName("일시정지");
        }
    }, [isTimerRunning, toggleTimer]);

    useInterval(() => {
        timeDecrement();
    }, toggleTimer ? 10 : null);

    const addTime = (time) => {
        setTimer((prev) => prev + time);
        leftTimeRef.current += time;
    };

    const minuteCalculator = () => {
        let toSecond = parseInt(timer / 1000);
        setMinute(parseInt(toSecond / 60).toString());
        setSecond(parseInt(toSecond % 60).toString());
        setMilliSecond(parseInt((timer % 1000) / 10).toString());
    };

    const toggleTimerFunc = () => {
        if (toggleTimer) {
            setToggleTimer(false);
        } else if (!toggleTimer && timer > 0) {
            setToggleTimer(true);
        }
    };

    const timeDecrement = () => {
        const timePassed = Date.now() - startTimeRef.current;
        setTimer(leftTimeRef.current + timePassed);
    };

    const clearTime = () => {
        setTimer(0);
    };

    return (
        <div className="timer__area">
            <div className="timer__time__area">
                <div className="timer__time timer-element">
                    <span className="timer__time__text">{minute.padStart(2, "0")}</span>
                    <span className="timer__symbol__text">:</span>
                    <span className="timer__time__text">{second.padStart(2, "0")}</span>
                    <span className="timer__symbol__text">.</span>
                    <span className="timer__time__text">{milliSecond.padStart(2, "0")}</span>
                </div>
            </div>
            {/*<div className="timer__btn__area">*/}
            {/*    <button className="btn_time" onClick={() => addTime(30 * 1000)}>+30sec</button>*/}
            {/*    <button className="btn_time" onClick={() => addTime(60 * 1000)}>+60sec</button>*/}
            {/*    <button className="btn_time" onClick={() => addTime(600 * 1000)}>+10min</button>*/}
            {/*</div>*/}
            <div className="timer__btn__toggle">
                <button className="btn_setup" onClick={() => toggleTimerFunc()}>{toggleBtnName}</button>
                <button className="btn_setup" onClick={() => clearTime()}>초기화</button>
            </div>
        </div>
    );

};

const useInterval = (callback, delay) => {
    const intervalRef = useRef();
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (typeof delay === "number") {
            intervalRef.current = setInterval(() => callbackRef.current(), delay);
        }
        return () => clearInterval(intervalRef.current);
    }, [delay]);

    return intervalRef;
};

export default TimerBox;