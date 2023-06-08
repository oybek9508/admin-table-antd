import { Select, Space, Typography } from 'antd';

type OptionDataProps = {
  value?: number;
  label?: string;
};

type BranchIdSelectProps = {
  options: OptionDataProps[];
  handleBranchIdChange: (value: string | string[]) => void;
};

const BranchIdSelect: React.FC<BranchIdSelectProps> = ({
  options,
  handleBranchIdChange,
}) => {
  return (
    <div
      style={{
        width: '100%',
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography>지정: </Typography>
      <Space style={{ width: '90%' }} direction="vertical">
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={options[0].label}
          onChange={handleBranchIdChange}
          options={options}
        />
      </Space>
    </div>
  );
};

export default BranchIdSelect;
