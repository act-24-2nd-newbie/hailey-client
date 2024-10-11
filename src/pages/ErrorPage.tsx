import React from 'react';
import src from '../assets/illust_error.png';

const Error = () => {
  return (
    <div>
      <img
        src={src}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '480px',
          height: '320px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default Error;
