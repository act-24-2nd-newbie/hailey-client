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
    const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options); // 월/일

    const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const formattedDay = date.toLocaleDateString('en-US', dayOptions); // 요일

    return `${formattedDate} (${formattedDay})`;
  };

  return (
    <div>
      <p>{formatDate(currentDateTime)}</p>
      {/* <p>{currentDateTime.toLocaleTimeString()}</p> */}
    </div>
  );
};

export default CurrentDateTime;
