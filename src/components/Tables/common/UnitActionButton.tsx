import { Button, Space } from 'antd';
import React from 'react';
import { Unit, UnitItem } from 'types/Unit';

type UnitActionButtonProps = {
  shouldShowButtons: boolean;
  handleShowActionButtons: (record: Unit | UnitItem) => void;
  record: Unit | UnitItem;
};

const UnitActionButton: React.FC<UnitActionButtonProps> = ({
  shouldShowButtons,
  handleShowActionButtons,
  record,
}) => {
  return (
    <Space size="middle">
      <Button type="text" onClick={() => console.log('수정')}>
        수정
      </Button>
      {shouldShowButtons ? (
        ['버튼1', '버튼2'].map((actionTitle) => {
          return (
            <Button
              type="text"
              key={actionTitle}
              onClick={() => console.log(actionTitle)}
            >
              {actionTitle}
            </Button>
          );
        })
      ) : (
        <Button type="text" onClick={() => handleShowActionButtons(record)}>
          더보기
        </Button>
      )}
    </Space>
  );
};

export default UnitActionButton;
