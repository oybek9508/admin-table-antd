import React from 'react';
import { UnitTableProps } from 'types/Unit';
import UnitColumn from './UnitTableColumns';
import TableButton from '../common/TableButton';

const TableData: React.FC<UnitTableProps> = ({ dataSource, buttonTitle }) => {
  return (
    <div>
      <TableButton buttonTitle={buttonTitle} />
      <UnitColumn dataSource={dataSource} />
    </div>
  );
};

export default TableData;
