import { useState, useEffect } from 'react';

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 날짜 및 시간 업데이트
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', timeZone: 'Asia/Seoul' };
    const formattedDate = date.toLocaleDateString('ko-KR', options); // 월/일

    const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'short', timeZone: 'Asia/Seoul' };
    const formattedDay = date.toLocaleDateString('ko-KR', dayOptions); // 요일

    return `${formattedDate} (${formattedDay})`;
  };

  return (
    <p
      style={{
        color: 'white',
        fontFamily: 'Roboto',

        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '18.75px',
        width: '80px',
      }}
    >
      {formatDate(currentDateTime)}
    </p>
  );
};

export default CurrentDateTime;
