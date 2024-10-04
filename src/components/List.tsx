import React, { useState } from 'react';
import type { ListProps } from '../type/Interface';

const List = ({ title, data, onSelect }: ListProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(data[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className={'sort'} style={{ position: 'relative' }}>
      <button style={{ width: '120px', height: '40px', border: 'none' }} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue} {/* Display the currently selected value */}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {data.map((value, index) => (
            <li key={index} onClick={() => handleSelectChange(value)}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
