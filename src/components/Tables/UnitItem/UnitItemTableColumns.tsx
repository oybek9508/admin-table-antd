/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Table, Badge } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useShowTableActionButtons from 'hooks/useShowTableActionButtons';
import { useMemo } from 'react';
import { UnitItem, UnitStatsProps } from 'types/Unit';
import { serializeDate } from 'utils/unit';
import UnitActionButton from '../common/UnitActionButton';

const UnitItemColumn: React.FC<UnitStatsProps> = ({ dataSource }) => {
  const [handleShowActionButtons, isShowingActionButtons] =
    useShowTableActionButtons();
  const columns: ColumnsType<UnitItem> = [
    { title: '유닛아이템', dataIndex: 'unitItemName', align: 'center' },
    {
      title: '유닛',
      dataIndex: 'unitItemName',
      align: 'center',
      render: (_: any, record) => (
        <Typography>
          {record.unitItemName?.slice(0, record.unitItemName?.indexOf('-'))}
        </Typography>
      ),
    },
    {
      title: '상테',
      dataIndex: 'width',
      align: 'center',
      render: (_: any, record) => {
        let statusText = '';
        let statusColor:
          | 'default'
          | 'processing'
          | 'success'
          | 'warning'
          | 'error'
          | undefined;
        const currentDate = new Date();
        const endDate = record.endDate ? new Date(record.endDate) : null;
        const startDate = record.startDate ? new Date(record.startDate) : null;

        if (startDate && endDate) {
          if (currentDate.getTime() < startDate.getTime()) {
            statusText = '이용예정';
            statusColor = 'success';
          } else if (currentDate.getTime() < endDate.getTime()) {
            statusText = '이용중';
            statusColor = 'processing';
          } else if (currentDate.getTime() > endDate.getTime()) {
            statusText = '이용종료';
            statusColor = 'default';
          }
        }

        return <Badge status={statusColor} text={statusText} />;
      },
    },
    {
      title: '이용시작일',
      dataIndex: 'startDate',
      align: 'center',
      render: (_: any, record) => {
        return <Typography>{serializeDate(record.startDate)}</Typography>;
      },
    },
    {
      title: '이용종료일',
      dataIndex: 'endDate',
      align: 'center',
      render: (_: any, record) => {
        return <Typography>{serializeDate(record?.endDate)}</Typography>;
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

  const unitItemTableData = useMemo(() => dataSource, [dataSource]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={unitItemTableData}
        pagination={{
          locale: { items_per_page: '쪽' },
          showTotal: (total, pageSize) => {
            return `${pageSize[0]}-${pageSize[1]} / 총 ${total}건`;
          },
        }}
      />
    </>
  );
};

export default UnitItemColumn;
