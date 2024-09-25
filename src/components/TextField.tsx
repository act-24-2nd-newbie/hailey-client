import React, { useState } from 'react';
import ic_delete from '../../public/ic_delete.png';
import ic_send from '../../public/ic_send.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';
// import { useNavigate } from 'react-router-dom';

const TextField = ({ borderVisible = true }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  // const [buttonVisible, SetButtonVisible] = useState(false);
  // const navigate = useNavigate();

  const handleDeleteClick = () => {
    setInputValue('');
    // SetButtonVisible(false)
  };

  const handleSendClick = () => {
    console.log({ inputValue });
    setInputValue('');
  };

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`}>
      <div className="textfield-text">
        <input
          id="textfield-input-text"
          type="text"
          placeholder="text"
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
