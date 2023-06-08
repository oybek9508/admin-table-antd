import React from 'react';
import { UnitItemTableProps } from 'types/Unit';
import UnitItemColumn from './UnitItemTableColumns';
import TableButton from '../common/TableButton';

const UnitItemTableData: React.FC<UnitItemTableProps> = ({
  dataSource,
  buttonTitle,
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <TableButton buttonTitle={buttonTitle} />
      <UnitItemColumn dataSource={dataSource} />
    </div>
  );
};

export default UnitItemTableData;
