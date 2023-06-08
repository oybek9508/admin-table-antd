import React, { useEffect, useState } from 'react';
import { UnitItem, UnitItemProps, UnitStatsProps } from 'types/Unit';
import { Badge, Card, Typography } from 'antd';

const StatisticsItem: React.FC<UnitItemProps> = ({
  title,
  quantity,
  status,
  ratio,
}) => {
  return (
    <div>
      <Badge status={status} text={title}>
        {status === undefined && title}
      </Badge>
      <Typography style={{ textAlign: 'center' }}>
        {quantity} {ratio && `비율 ${ratio}%`}
      </Typography>
    </div>
  );
};

const TableStatistics: React.FC<UnitStatsProps> = ({ dataSource }) => {
  const [allData, setAllData] = useState<UnitItem[]>([]);
  useEffect(() => {
    if (dataSource === undefined) return;
    setAllData(dataSource);
  }, [dataSource]);

  const filterUnitItemByCondition = (type: string) => {
    const currentDate = new Date();
    return allData.filter((data) => {
      const startDate = data?.startDate ? new Date(data?.startDate) : null;
      const endDate = data?.endDate ? new Date(data?.endDate) : null;
      let isInUse = null;
      if (startDate && endDate) {
        if (type === 'success') {
          isInUse = currentDate.getTime() < startDate.getTime();
          return isInUse;
        } else if (type === 'processing') {
          isInUse = currentDate.getTime() < endDate.getTime();
          return isInUse;
        } else if (type === 'default') {
          isInUse = currentDate.getTime() > endDate.getTime();
          return isInUse;
        }
      }
      return isInUse;
    });
  };

  const filterInUse = filterUnitItemByCondition('processing');
  const filterBeInUse = filterUnitItemByCondition('success');
  const filterExpired = filterUnitItemByCondition('default');

  const mainStatisticsData: UnitItemProps[] = [
    {
      title: '전체 유닛 개수',
      quantity: allData.length,
    },
    {
      title: '이용중',
      quantity: filterInUse?.length,
      ratio: Math.ceil((filterInUse?.length * 100) / allData.length),
      status: 'processing',
    },
    {
      title: '이용예정',
      quantity: filterBeInUse.length,
      status: 'success',
    },
    {
      title: '이용종료',
      quantity: filterExpired.length,
      status: 'warning',
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
            ratio={item.ratio}
            status={item?.status}
          />
        ))}
      </div>
    </Card>
  );
};

export default TableStatistics;
