import React, { useState, useEffect, useRef } from "react";
import "./Timerstyle.css";

const TimerBox = () => {
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [milliSecond, setMilliSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleBtnName, setToggleBtnName] = useState("시작");
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const startTimeRef = useRef(0);
    const pausedTimeRef = useRef(0);

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
            setIsTimerRunning(true);
        } else if (!toggleTimer) {
            setIsTimerRunning(false);
            pausedTimeRef.current = timer; // 타이머 일시정지 시 현재 시간을 저장
        }
    }, [toggleTimer]);

    useEffect(() => {
        if (!isTimerRunning) {
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
    };

    const minuteCalculator = () => {
        let toSecond = parseInt(timer / 1000);
        setMinute(parseInt(toSecond / 60).toString());
        setSecond(parseInt(toSecond % 60).toString());
        setMilliSecond(parseInt((timer % 1000) / 10).toString());
    };

    const toggleTimerFunc = () => {
        setToggleTimer((prev) => !prev); // toggle 기능을 간단하게 처리
    };

    const timeDecrement = () => {
        if (toggleTimer) {
            const timePassed = Date.now() - startTimeRef.current;
            setTimer(pausedTimeRef.current + timePassed);
        }
    };

    const clearTime = () => {
        setTimer(0);
        pausedTimeRef.current = 0; // 타이머를 초기화할 때 pausedTimeRef도 초기화
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
            <div className="timer__btn__toggle">
                <button className="btn_setup" onClick={toggleTimerFunc}>{toggleBtnName}</button>
                <button className="btn_setup" onClick={clearTime}>초기화</button>
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
