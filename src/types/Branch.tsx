export interface Branch {
  id?: number;
  branchName?: string;
  isAvailable?: number;
  isExamined?: number;
  numberOfUnits?: number;
  createdAt?: string;
  updatedAt?: string;
}
export type MainPageProps = {
  branchData?: Branch[];
  hasError: boolean;
};

export type BranchTableProps = {
  dataSource: Branch[] | undefined;
  buttonTitle?: string;
};

export type BranchColumnProps = {
  dataSource: Branch[] | undefined;
};

export type BranchItemProps = {
  title: string;
  quantity: number;
  status?:
    | 'success'
    | 'processing'
    | 'error'
    | 'default'
    | 'warning'
    | undefined;
};
