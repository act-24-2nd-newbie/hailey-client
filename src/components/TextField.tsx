import React, { useState } from 'react';
import ic_delete from '../../public/ic_delete.png';
import ic_send from '../../public/ic_send.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';

const TextField = ({ borderVisible = true, placeholder, onSend }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleDeleteClick = () => {
    setInputValue('');
  };

  const handleSendClick = () => {
    console.log({ inputValue });
    if (onSend) {
      onSend(inputValue);
    }
    setInputValue('');
  };

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`}>
      <div className="textfield-text">
        <input
          id="textfield-input-text"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {inputValue.length > 0 && (
          <img className="textfield-button-delete" src={ic_delete} onClick={handleDeleteClick} />
        )}
      </div>
      <div className="textfield-send">
        <img className="textfield-button-send" src={ic_send} onClick={handleSendClick} />
      </div>
    </div>
  );
};

export default TextField;
