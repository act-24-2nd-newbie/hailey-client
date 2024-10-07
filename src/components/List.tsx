import { useState, useRef, useEffect } from 'react';
import type { ListProps } from '../type/Interface';
import '../styles/List.css';

const List = ({ data, onSelect }: ListProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(data[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
  };

  useEffect(() => {
      // 클릭 이벤트 리스너 추가
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          // 컴포넌트 언마운트 시 이벤트 리스너 제거
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        style={{
          borderRadius: isOpen ? '4px 4px 0 0' : '4px',
          boxShadow: isOpen ? '0px 4px 4px 0px rgba(0; 0; 0; 0.2)' : '0px 2px 4px 0px rgba(0; 0; 0; 0.2)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
        <span
          style={{
            alignSelf: 'right',
            position: 'relative',
            left: '35px',
            width: '10px',
            height: '8px',
            color: 'rgb(128, 128, 128)',
            transform: 'translateY(-50%)',
          }}
        >
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      {isOpen && (
        <ul className="dropdown-content">
          {data.map((value, index) => (
            <li key={index} onClick={() => handleSelectChange(value)}>
              {value}
            </li>
          ))}
          {/* </ul> */}
        </ul>
      )}
    </div>
  );
};

export default List;
