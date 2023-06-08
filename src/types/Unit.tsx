import { Branch } from './Branch';

export interface Unit {
  id?: number;
  branchId?: number;
  unitName?: string;
  numberOfUnitItems?: number;
  width?: number;
  depth?: number;
  height?: number;
  priceValue?: number;
  createdAt?: string;
  updatedAt?: string;
  numberOfItemInUse?: number;
}

export interface UnitItem {
  id?: number;
  unitId?: number;
  unitItemName?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UnitPageProps = {
  unitData?: Unit[];
  unitItemData?: UnitItem[];
  branchData: Branch[];
  hasError?: boolean;
};

export type UnitTableProps = {
  dataSource: Unit[] | undefined;
  buttonTitle?: string;
};

export type UnitItemProps = {
  title: string;
  quantity: number;
  ratio?: number;
  status?:
    | 'success'
    | 'processing'
    | 'error'
    | 'default'
    | 'warning'
    | undefined;
};

export type UnitStatsProps = {
  dataSource: UnitItem[] | undefined;
};

export type UnitColumnProps = {
  dataSource: Unit[] | undefined;
};

export type UnitItemTableProps = {
  dataSource: UnitItem[] | undefined;
  buttonTitle?: string;
};
