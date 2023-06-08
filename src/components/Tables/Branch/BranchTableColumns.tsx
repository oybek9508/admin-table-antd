/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Typography, Table, Badge, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import useShowTableActionButtons from 'hooks/useShowTableActionButtons';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Branch, BranchColumnProps } from 'types/Branch';
import { serializeDate } from 'utils/unit';

const BranchColumn: React.FC<BranchColumnProps> = ({ dataSource }) => {
  const router = useRouter();
  const [handleShowActionButtons, isShowingActionButtons] =
    useShowTableActionButtons();

  const renderActionButtons = (record: Branch) => {
    const shouldShowButtons: boolean = isShowingActionButtons(record);
    return (
      <Space size="middle">
        {['창고', '유닛', '예약'].map((actionTitle, idx) => {
          return (
            <Tooltip key={actionTitle} title={actionTitle}>
              <Button type="text" onClick={() => console.log(actionTitle)}>
                {actionTitle}
              </Button>
            </Tooltip>
          );
        })}
        {shouldShowButtons ? (
          ['버튼1', '버튼2'].map((actionTitle) => {
            return (
              <Tooltip key={actionTitle} title={actionTitle}>
                <Button type="text" onClick={() => console.log(actionTitle)}>
                  {actionTitle}
                </Button>
              </Tooltip>
            );
          })
        ) : (
          <Tooltip title="더보기">
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={() => handleShowActionButtons(record)}
            />
          </Tooltip>
        )}
      </Space>
    );
  };

  const renderBranchStatus = (record: Branch, type: string) => {
    let statusText = '';
    let statusColor:
      | 'default'
      | 'processing'
      | 'success'
      | 'warning'
      | 'error'
      | undefined;
    if (type === 'isExamined') {
      if (record.isExamined === 0) {
        statusText = '검수중';
        statusColor = 'processing';
      } else if (record.isExamined === 1) {
        statusText = '검수완료';
        statusColor = 'success';
      } else if (record.isExamined === 2) {
        statusText = '검수반려';
        statusColor = 'warning';
      }
    } else if (type === 'isAvailable') {
      if (record.isAvailable === 0) {
        statusText = '미문영';
        statusColor = 'error';
      } else if (record.isAvailable === 1) {
        statusText = '융영중';
        statusColor = 'success';
      }
    }

    return <Badge status={statusColor} text={statusText} />;
  };

  const columns: ColumnsType<Branch> = [
    { title: '순번', dataIndex: 'id', align: 'center' },
    { title: '창고명', dataIndex: 'branchName', align: 'center' },
    {
      title: '운영상태',
      dataIndex: 'isAvailable',
      align: 'center',
      render: (_: any, record) => {
        return renderBranchStatus(record, 'isAvailable');
      },
    },
    {
      title: '검수상태',
      dataIndex: 'isExamined',
      align: 'center',
      render: (_: any, record) => {
        return renderBranchStatus(record, 'isExamined');
      },
    },
    {
      title: '유닛',
      dataIndex: 'numberOfUnits',
      align: 'center',
      render: (_: any, record) => (
        <Typography
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push(`/unit/?branchId=${record.id}`, undefined, {
              shallow: true,
            });
          }}
        >
          {record.numberOfUnits}개
        </Typography>
      ),
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      align: 'center',
      render: (_: any, record) => {
        return <Typography>{serializeDate(record?.createdAt)}</Typography>;
      },
    },
    {
      title: '수정일',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (_: any, record) => {
        return <Typography>{serializeDate(record?.updatedAt)}</Typography>;
      },
    },
    {
      title: '관리',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (_: any, record) => {
        return renderActionButtons(record);
      },
    },
  ];

  const branchTableData = useMemo(() => dataSource, [dataSource]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={branchTableData}
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

export default BranchColumn;
