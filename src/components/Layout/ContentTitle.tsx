import { Typography } from 'antd';
import React from 'react';

export const ContentTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography>{title}</Typography>
);
