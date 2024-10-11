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
  field = 'normal',
  type = 'text',
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(initialInputValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const validTextRegex = /^[a-zA-Z0-9가-힣\s.,?@!‘"”]*$/;
  const validEmailRegex = /^[A-Za-z0-9]@[A-Za-z0-9]\.[A-Za-z]{2,3}$/;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 유효성 검사
    if (field == 'text' && !validTextRegex.test(value)) {
      setErrorMsg('Invalid text format');
      console.log('1', value);
    } else if (field == 'email' && validEmailRegex.test(value)) {
      setErrorMsg('Invalid email format');
      console.log('2', value);
    } else {
      setErrorMsg(null);
      console.log('3', value);
    }
    setInputValue(value);
  };

  const isInputActive = isFocused && inputValue.length > 0;

  return (
    <div className={`textfield ${borderVisible ? 'border' : ''}`} style={style}>
      <div className={`textfield-text ${borderVisible ? 'border' : ''} ${isFocused ? 'focus' : ''} `}>
        <input
          id={`textfield-input`}
          ref={inputRef}
          type={type}
          placeholder={isFocused ? '' : placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={activeEnter}
          autoFocus={focus}
        ></input>
        {inputValue.length > 0 && !borderVisible && (
          <img className="textfield-button-delete" src={ic_delete} onClick={handleDeleteClick} />
        )}
        <p style={{ position: 'absolute', top: '10px', color: 'red' }}> {errorMsg}</p>
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
