import { useState } from 'react';
import type { ListProps } from '../type/Interface';
import '../styles/List.css';

const List = ({ data, onSelect }: ListProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(data[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className="dropdown">
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
        <div className="dropdown-content">
          {data.map((value, index) => (
            <p key={index} onClick={() => handleSelectChange(value)}>
              {value}
            </p>
          ))}
          {/* </ul> */}
        </div>
      )}
    </div>
  );
};

export default List;
