import React, { useState, useRef } from 'react';
import ic_delete from '../assets/ic_delete.png';
import ic_send_active from '../assets/ic_send_active.png';
import ic_send_inactive from '../assets/ic_send_inactive.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';

const TextField = ({
  borderVisible = false,
  placeholder = '',
  inputValue: initialInputValue = '',
  onSend,
  style = {},
  focus = false,
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(initialInputValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSendClick = () => {
    if (inputValue.length === 0 || inputValue === initialInputValue) {
      inputRef.current?.focus();
      return;
    }
    if (inputValue.length === 0) inputRef.current?.blur();
    if (onSend) {
      onSend(inputValue);
    }

    setInputValue('');
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.length !== 0 && initialInputValue !== inputValue) {
      handleSendClick();
    }
  };

  const isInputActive = isFocused && inputValue.length > 0;

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`} style={style}>
      <div className={`textfield-text ${borderVisible ? 'border' : ''} ${isFocused ? 'focus' : ''} `}>
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
          autoFocus={focus}
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
