/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useShowTableActionButtons from 'hooks/useShowTableActionButtons';
import { useMemo } from 'react';
import { Unit, UnitColumnProps } from 'types/Unit';
import UnitActionButton from '../common/UnitActionButton';

const UnitColumn: React.FC<UnitColumnProps> = ({ dataSource }) => {
  const [handleShowActionButtons, isShowingActionButtons] =
    useShowTableActionButtons();

  const columns: ColumnsType<Unit> = [
    { title: '유닛', dataIndex: 'unitName', align: 'center' },
    { title: '총개수', dataIndex: 'numberOfUnitItems', align: 'center' },
    {
      title: '사용중',
      align: 'center',
      render: (_: any, record) => {
        return <Typography>{record.numberOfItemInUse}</Typography>;
      },
    },
    {
      title: '점유율',
      align: 'center',
      render: (_: any, record) => {
        const { numberOfUnitItems, numberOfItemInUse } = record;
        if (numberOfUnitItems === undefined || numberOfItemInUse === undefined)
          return null;
        const share = Math.round((numberOfItemInUse * 100) / numberOfUnitItems);
        return <Typography>{share}%</Typography>;
      },
    },
    {
      title: '너비',
      dataIndex: 'width',
      align: 'center',
    },
    { title: '깊이', dataIndex: 'depth', align: 'center' },
    { title: '높이', dataIndex: 'height', align: 'center' },
    {
      title: '이용요금',
      dataIndex: 'priceValue',
      key: 'operation',
      align: 'center',
      render: (_: any, record) => {
        const numberWithCommas = (priceValue: number) => {
          return priceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
        if (record.priceValue === undefined) return;
        return (
          <Typography>{numberWithCommas(record?.priceValue)}원</Typography>
        );
      },
    },
    {
      title: '관리',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (_: any, record) => {
        const shouldShowButtons: boolean = isShowingActionButtons(record);
        return (
          <UnitActionButton
            shouldShowButtons={shouldShowButtons}
            record={record}
            handleShowActionButtons={handleShowActionButtons}
          />
        );
      },
    },
  ];

  const unitTableData = useMemo(() => dataSource, [dataSource]);
  return (
    <>
      <Table columns={columns} dataSource={unitTableData} pagination={false} />
    </>
  );
};

export default UnitColumn;
