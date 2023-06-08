import React from 'react';
import { BranchTableProps } from 'types/Branch';
import TableStatistics from './TableStatistics';
import BranchColumn from './BranchTableColumns';
import TableButton from '../common/TableButton';

const TableData: React.FC<BranchTableProps> = ({ dataSource, buttonTitle }) => {
  return (
    <div>
      <TableStatistics dataSource={dataSource} />
      <TableButton buttonTitle={buttonTitle} />
      <BranchColumn dataSource={dataSource} />
    </div>
  );
};

export default TableData;
