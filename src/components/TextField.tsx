import React, { useState, useRef, useEffect } from 'react';
import ic_delete from '../assets/ic_delete.png';
import ic_send_active from '../assets/ic_send_active.png';
import ic_send_inactive from '../assets/ic_send_inactive.png';
import '../styles/TextField.css';
import type { TextFieldProps } from '../type/Interface';

const validTextRegex = /^[가-힣a-zA-Z0-9\s.,?@!‘"”]*$/;
const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  // 유효성 검사 함수
  const validateInput = (value: string) => {
    if (type === 'text' && !validTextRegex.test(value)) {
      console.log('text');
      return 'Invalid text format';
    }
    if (type === 'email' && !validEmailRegex.test(value)) {
      console.log('email');
      return 'Invalid email format';
    }
    console.log('ok');
    return null;
  };

  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorMsg(validateInput(value));
    setInputValue(value);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    setInputValue('');
    setErrorMsg(null);
    inputRef.current?.focus();
  };

  // 전송 버튼 클릭 핸들러
  const handleSendClick = () => {
    if (!inputValue || inputValue === initialInputValue) {
      inputRef.current?.focus();
      return;
    }
    if (!errorMsg) {
      // 유효성 검사를 통과한 경우에만 onSend 호출
      onSend?.(inputValue);
      setInputValue('');
      setErrorMsg(null); // 전송 후 에러 메시지 초기화
    } else {
      inputRef.current?.focus(); // 유효성 검사를 통과하지 못한 경우 다시 포커스
    }
  };

  // Enter 키 핸들러
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && inputValue !== initialInputValue && !errorMsg) {
      handleSendClick();
    }
  };

  // 포커스 관리
  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div style={style}>
      <div className={`textfield ${borderVisible ? 'border' : ''}`}>
        <div
          className={`textfield-text  ${errorMsg ? 'error' : ''} ${borderVisible ? 'border' : ''} ${isFocused ? 'focus' : ''} `}
        >
          <input
            id={`textfield-input`}
            ref={inputRef}
            type={type}
            placeholder={isFocused ? '' : placeholder}
            value={inputValue}
            onChange={
              field == 'signup'
                ? handleChange
                : (e) => {
                    setInputValue(e.target.value);
                  }
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={activeEnter}
            autoFocus={focus}
          ></input>
          {inputValue.length > 0 && !borderVisible && (
            <img className="textfield-button-delete" src={ic_delete} onClick={handleDeleteClick} />
          )}
        </div>
        <div className="textfield-send">
          {type !== 'email' ? (
            <img
              className={`textfield-button-send ${(isFocused && inputValue) || !errorMsg ? 'active' : ''}`}
              src={isFocused && !errorMsg ? ic_send_active : ic_send_inactive}
              onClick={handleSendClick}
            />
          ) : (
            <button>Check</button>
          )}
        </div>
      </div>
      {errorMsg && (
        <p
          style={{
            position: 'absolute',
            top: '50px',
            margin: '0px',
            color: 'rgba(209, 80, 80, 1)',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '18px',
          }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default TextField;
