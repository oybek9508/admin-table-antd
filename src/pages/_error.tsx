import React from 'react';
import { useRouter } from 'next/router';
import { Button, Result } from 'antd';
import { NextPage } from 'next';

type ErrorProps = {
  statusCode?: number;
};

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const router = useRouter();

  const onBackButtonClicked = () => {
    if (router?.back) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result
        status="error"
        title={statusCode ? `Error ${statusCode}` : 'Error'}
        subTitle="Oops! Something went wrong."
        extra={
          <Button type="primary" onClick={onBackButtonClicked}>
            Go Back
          </Button>
        }
      />
    </div>
  );
};

export default Error;
