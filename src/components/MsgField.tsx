import React, { useEffect, useState } from 'react';

const MsgField: React.FC<{ message: string; style?: React.CSSProperties }> = ({ message, style }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <>{isVisible && <div style={style}>{message}</div>}</>;
};

export default MsgField;
