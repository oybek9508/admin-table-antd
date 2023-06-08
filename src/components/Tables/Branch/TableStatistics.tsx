import { Badge, Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Branch, BranchColumnProps, BranchItemProps } from 'types/Branch';

const StatisticsItem: React.FC<BranchItemProps> = ({
  title,
  quantity,
  status,
}) => {
  return (
    <div>
      <Badge status={status} text={title}>
        {status === undefined && title}
      </Badge>
      <Typography style={{ textAlign: 'center' }}>{quantity}</Typography>
    </div>
  );
};

const TableStatistics: React.FC<BranchColumnProps> = ({ dataSource }) => {
  const [allData, setAllData] = useState<Branch[]>([]);
  useEffect(() => {
    if (dataSource === undefined) return;
    setAllData(dataSource);
  }, [dataSource]);

  const filterDataByCondition = (condition: number, type: string) => {
    if (type === 'available')
      return allData.filter((data) => data.isAvailable === condition);
    return allData.filter((data) => data.isExamined === condition);
  };

  const underExamination = filterDataByCondition(0, 'examined');
  const examined = filterDataByCondition(1, 'examined');
  const isInspected = filterDataByCondition(2, 'examined');
  const notAvailable = filterDataByCondition(0, 'available');
  const isAvailable = filterDataByCondition(1, 'available');

  const mainStatisticsData: BranchItemProps[] = [
    {
      title: '전체',
      quantity: allData.length,
    },
    {
      title: '검수중',
      quantity: underExamination.length,
      status: 'processing',
    },
    {
      title: '검수완료',
      quantity: examined.length,
      status: 'success',
    },
    {
      title: '검수반려',
      quantity: isInspected.length,
      status: 'warning',
    },
    {
      title: '미문영',
      quantity: notAvailable.length,
      status: 'error',
    },
    {
      title: '융영중',
      quantity: isAvailable.length,
      status: 'success',
    },
  ];

  return (
    <Card
      style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
      bodyStyle={{ paddingBottom: '10px', paddingTop: '10px' }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {mainStatisticsData.map((item, idx) => (
          <StatisticsItem
            key={item.title}
            title={item.title}
            quantity={item.quantity}
            status={item?.status}
          />
        ))}
      </div>
    </Card>
  );
};

export default TableStatistics;
