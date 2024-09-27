import React, { useState, useRef } from 'react';
import ic_delete from '../../public/ic_delete.png';
import ic_send_active from '../../public/ic_send_active.png';
import ic_send_inactive from '../../public/ic_send_inactive.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';

const TextField = ({ borderVisible = true, placeholder, onSend }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = () => {
    setInputValue('');
    inputRef.current?.focus();
    // setIsFocused(true);
  };

  const handleSendClick = () => {
    if (onSend) {
      onSend(inputValue);
    }
    setInputValue('');
    inputRef.current?.focus();
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const isInputActive = isFocused && inputValue.length > 0;

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`}>
      <div className={`textfield-text ${isFocused ? 'focus' : ''}`}>
        <input
          id="textfield-input-text"
          ref={inputRef}
          type="text"
          placeholder={isFocused ? '' : placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => setIsFocused(true)} // 포커스 상태 true
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyDown={(e) => activeEnter(e)}
        />
        {inputValue.length > 0 && (
          <img className="textfield-button-delete" src={ic_delete} onClick={handleDeleteClick} />
        )}
      </div>
      <div className="textfield-send">
        <img
          className={`textfield-button-send ${isInputActive ? 'active' : ''}`}
          src={isInputActive ? ic_send_active : ic_send_inactive}
          onClick={handleSendClick}
        />
      </div>
    </div>
  );
};

export default TextField;
