import React, { useState, useRef } from 'react';
import ic_delete from '../assets/ic_delete.png';
import ic_send_active from '../assets/ic_send_active.png';
import ic_send_inactive from '../assets/ic_send_inactive.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';

const TextField = ({ borderVisible = true, placeholder, onSend, width, top, left }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSendClick = () => {
    if (inputValue.length === 0) inputRef.current?.blur();
    if (onSend) {
      onSend(inputValue);
    }

    setInputValue('');
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const isInputActive = isFocused && inputValue.length > 0;

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`} style={{ width: width, top: top, left: left }}>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={activeEnter}
        />
        {inputValue.length > 0 && (
          <img className="textfield-button-delete" src={ic_delete} onClick={handleDeleteClick} />
        )}
      </div>
      <div className="textfield-send">
        <img
          className={`textfield-button-send ${isInputActive ? 'active' : ''}`}
          src={isFocused ? ic_send_active : ic_send_inactive}
          onClick={handleSendClick}
        />
      </div>
    </div>
  );
};

export default TextField;
