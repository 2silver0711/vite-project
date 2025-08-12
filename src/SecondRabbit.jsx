import React, { useState, useRef } from 'react';
import KakaoVisitorButton from './KakaoVisitorButton';

const MAX_CARROTS_SECOND = 40;

export default function SecondRabbit() {
    const [count, setCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState('');
    const timerRef = useRef(null);

    const rabbitImages = [
        "https://img.freepik.com/premium-photo/cute-white-baby-rabbit-sitting-cloth-friendship-with-cute-easter-bunny_7186-3499.jpg",
        "https://lh3.googleusercontent.com/proxy/SWmfbx2GPwZUau6tHZ3QtHvTj2is2sC7vX4wPEB0CEkzH2ZBmCPXwCFAqF36kEl8BJ6pRwtmuMREt1faiKvcAMZ9TFWx6mMEb0LS2LEkDOIF",
        "https://lh3.googleusercontent.com/proxy/Uobue393kzhwh3C4WpaD02eoSitwhT-JmGK7ddSMQTjuUhMUF9G3LVei9bn0bCX1TqX7cknmoyLmtbzW1TeGMBuA2vukAZHmDXINRjQwgYuTfg",
        "https://mblogthumb-phinf.pstatic.net/20130423_16/superbin0713_13667047178123xoWh_JPEG/090428_pig2.jpg?type=w420"
    ];

    const imgIndex = Math.min(Math.floor(count / 10), rabbitImages.length - 1);

    const showTemporaryMessage = (text, duration = 2500) => {
        clearTimeout(timerRef.current);
        setMessageText(text);
        setShowMessage(true);
        timerRef.current = setTimeout(() => setShowMessage(false), duration);
    };

    const handleIncrease = () => {
        setCount(prev => {
            if (prev >= MAX_CARROTS_SECOND) {
                showTemporaryMessage("🥕 두 번째 토끼도 배불러요! 더 이상 못 먹입니다!", 4000);
                return prev;
            }

            const newCount = prev + 1;
            if (newCount % 10 === 0) {
                showTemporaryMessage(`🎉 축하해요! 두 번째 토끼가 성장했어요! (${newCount}개)`);
            } else if (newCount % 5 === 0) {
                showTemporaryMessage(`🥕 당근 먹이는 중! 두 번째 토끼가 좋아해요! (${newCount}개)`);
            }
            return newCount;
        });
    };

    const handleReset = () => {
        setCount(0);
        showTemporaryMessage("🔄 두 번째 토끼가 리셋되었어요! 다시 키워보세요!");
    };

    return (
        <div className="app-container">
            <div className="profile-section">
                <img
                    src={rabbitImages[imgIndex]}
                    alt="두 번째 토끼 프로필"
                    className="profile-img"
                />
                <h2 className="profile-name">둘째 토끼 당근먹이기 🐇</h2>
                <p className="profile-status">"나도 배고파!"</p>
                <div className="button-wrapper">
                    <KakaoVisitorButton count={count} onIncrease={handleIncrease} label="두 번째 토끼" />
                </div>
                <div className="second-buttons">
                    <button className="action-btn" onClick={handleReset}>리셋</button>
                </div>
                <p className="count-text">당근 먹인 수: {count}</p>
            </div>

            {showMessage && (
                <div className="congrats-msg">
                    {messageText}
                </div>
            )}
        </div>
    );
}
