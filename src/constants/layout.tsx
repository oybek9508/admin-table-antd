import { MenuProps } from 'antd';
import Link from 'next/link';

export const items: MenuProps['items'] = [
  { key: '1', label: <Link href="/main">창고</Link> },
  { key: '2', label: <Link href="/unit?branchId=1">유닛</Link> }, // 초기값은 ‘id’: 1
];
