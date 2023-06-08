import { useState } from 'react';
import { Branch } from 'types/Branch';
import { Unit, UnitItem } from 'types/Unit';

const useShowTableActionButtons = (): [
  handleShowActionButtons: (record: Branch | Unit | UnitItem) => void,
  isShowingActionButtons: (record: Branch | Unit | UnitItem) => boolean,
] => {
  const [branchId, setBranchId] = useState<number>();

  const handleShowActionButtons = (record: Branch | Unit | UnitItem) => {
    setBranchId(record.id);
  };

  const isShowingActionButtons = (
    record: Branch | Unit | UnitItem,
  ): boolean => {
    return record.id === branchId;
  };

  return [handleShowActionButtons, isShowingActionButtons];
};

export default useShowTableActionButtons;
