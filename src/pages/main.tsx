import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import PageLayout from 'components/Layout';
import { getBranchData } from 'utils/api/branch';
import { MainPageProps } from 'types/Branch';
import Error from './_error';
import TableData from 'components/Tables/Branch';
import { ContentTitle } from 'components/Layout/ContentTitle';

const Main: NextPage<MainPageProps> = ({ branchData, hasError }) => {
  if (hasError) {
    return <Error statusCode={500} />;
  }

  return (
    <PageLayout>
      <ContentTitle title="창고" />
      {!branchData ? (
        'Loading'
      ) : (
        <TableData dataSource={branchData} buttonTitle="+ 창고 추가" />
      )}
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const branchData = await getBranchData();
  try {
    return {
      props: {
        branchData,
      },
    };
  } catch (error) {
    return {
      props: { hasError: true },
    };
  }
};
export default Main;
