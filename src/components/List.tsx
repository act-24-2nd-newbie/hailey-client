import React, { useState } from 'react';
import type { ListProps } from '../type/Interface';

const List = ({ title, data }: ListProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(data[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  return (
    <div className={title}>
      <select value={selectedValue} onChange={handleSelectChange}>
        {data.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      {/* <p> 선택된 값 : {selectedValue} </p> */}
    </div>
  );
};

export default List;
