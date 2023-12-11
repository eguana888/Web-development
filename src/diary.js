import React, { useState, useEffect } from 'react';

export default function Diary({ onSaveDiary, diaryContent, setDiaryContent }) {
    const [colors] = useState({
        bgColor: 'lightgray',
        textColor: 'black',
        btnColor: 'blue',
    });

    const [savedDiaries, setSavedDiaries] = useState([]);

    // 컴포넌트가 마운트될 때 저장된 일기 데이터를 불러옵니다.
    useEffect(() => {
        const existingDiaries = JSON.parse(localStorage.getItem("Diary")) || [];
        setSavedDiaries(existingDiaries);
    }, []);

    const Title = ({ children }) => (
        <h1 style={{ color: colors.textColor, margin: '50px 0', textAlign: 'center', fontSize: '30px', fontWeight: '500' }}>
            {children}
        </h1>
    );

    const TextInput = ({ value, placeholder, onChange }) => (
        <input
            type="text"
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '18px',
                width: '95%',
                margin: 'auto',
                textAlign: 'center',
                display: 'block'
            }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );

    const Btn = ({ onClick, children }) => (
        <button
            style={{
                width: '100%',
                marginTop: '20px',
                backgroundColor: colors.btnColor,
                padding: '10px 20px',
                textAlign: 'center',
                border: 'none',
                borderRadius: '20px',
                boxShadow: '1px 1px 3px rgba(41, 30, 95, 0.2)',
                color: 'white',
                fontWeight: '500',
                fontSize: '18px',
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );

    const Emotion = ({ selected, onClick, children }) => (
        <button
            style={{
                backgroundColor: 'white',
                boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                borderRadius: '20px',
                borderWidth: '2px',
                borderColor: selected ? 'red' : 'gray',
                overflow: 'hidden',
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );

    const EmotionText = ({ children }) => (
        <span style={{ fontSize: '24px' }}>{children}</span>
    );

    const emotions = ['😊', '😂', '😅', '😡', '😱'];

    const Write = () => {
        const [selectedEmotion, setEmotion] = useState(null);
        const [feelings, setFeelings] = useState('');

        const onChangeText = (event) => setFeelings(event.target.value);
        const onEmotionPress = (face) => setEmotion(face);
        const UnEmotionPress = () => setEmotion(null);

        const onSubmit = () => {
            if (selectedEmotion && feelings.trim() !== "") {
                console.log("이모션:", selectedEmotion);
                console.log("코멘트:", feelings);

                // 일기 저장 함수 호출
                onSaveDiary(selectedEmotion+feelings);

                // 일기 작성 후 내용 초기화
                setFeelings("");
                setEmotion(null);
            } else {
                alert("이모션과 텍스트를 모두 작성해주세요!");
            }
        };
        const onClearDiary = () => {
            // 저장된 일기 목록 초기화
            localStorage.removeItem("Diary");

            // 상태 초기화
            setSavedDiaries([]);
        };

        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', justifyContent: 'space-between' }}>
                    {emotions.map((emotion, index) => (
                        <Emotion
                            selected={emotion === selectedEmotion}
                            onClick={() => (selectedEmotion === emotion ? UnEmotionPress() : onEmotionPress(emotion))}
                            key={index}
                        >
                            <EmotionText>{emotion}</EmotionText>
                        </Emotion>
                    ))}
                </div>

                <TextInput
                    value={feelings}
                    placeholder="오늘의 하루를 요약해주세요!"
                    onChange={onChangeText}
                />

                <Btn onClick={onSubmit}>Save</Btn>
                <Btn onClick={onClearDiary}>Clear</Btn>
            </>
        );
    };

    const DiaryList = () => {
        return (
            <div>
                <h2>저장된 일기 목록</h2>
                <ul>
                    {savedDiaries.map((diary, index) => (
                        <li key={index}>{diary.date}: {diary.content}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: colors.bgColor, padding: '1px 50px' }}>
            <Title>오늘의 하루는..</Title>
            <Write />
            <DiaryList />
        </div>
    );
}
