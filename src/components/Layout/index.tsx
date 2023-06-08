/* eslint-disable react/display-name */
import React from 'react';
import { Affix, Layout, Menu } from 'antd';
import type { AppProps } from 'antd';
import { items } from 'constants/layout';

const { Header, Sider, Content } = Layout;

const PageLayout: React.FC<AppProps> = React.memo(({ children }) => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
        <Affix>
          <Sider style={{ background: 'white', height: '100vh' }}>
            <Menu items={items} />
          </Sider>
        </Affix>
        <Content style={{ padding: '20px 40px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
});

export default PageLayout;
