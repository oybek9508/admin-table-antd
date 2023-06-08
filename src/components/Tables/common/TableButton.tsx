import { Button } from 'antd';
import React from 'react';

interface TableButtonProps {
  buttonTitle?: string;
}

const TableButton: React.FC<TableButtonProps> = ({ buttonTitle }) => {
  const handleButtonClick = () => {
    console.log(buttonTitle);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Button type="primary" onClick={handleButtonClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default TableButton;
