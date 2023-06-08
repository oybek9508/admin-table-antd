/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PageLayout from 'components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { getUnitData, getUnitItemData } from 'utils/api/unit';
import { Unit, UnitItem, UnitPageProps } from 'types/Unit';
import Error from './_error';
import { useRouter } from 'next/router';
import TableData from 'components/Tables/Unit';
import UnitItemTableData from 'components/Tables/UnitItem';
import BranchIdSelect from 'components/Select/BranchIdSelect';
import TableStatistics from 'components/Tables/Unit/TableStatistics';
import { getBranchData } from 'utils/api/branch';
import { ContentTitle } from 'components/Layout/ContentTitle';

const Unit: NextPage<UnitPageProps> = ({
  unitData,
  unitItemData,
  branchData,
  hasError,
}) => {
  const currentDate = new Date();
  const router = useRouter();
  const options: { value?: number; label?: string }[] = [];
  const [unitItemTableData, setUnitItemTableData] = useState<UnitItem[]>([]);
  const [unitTableData, setUnitTableData] = useState<Unit[]>([]);
  const [filteredUnitTableData, setFilteredUnitTableData] = useState<Unit[]>(
    [],
  );
  const { branchId } = router.query;

  useEffect(() => {
    if (!unitData) return;
    let filteredUnitData = unitData.filter((data) => {
      if (!branchId) return;
      return data.branchId === parseInt(branchId as string);
    });
    setUnitTableData(filteredUnitData);
  }, [unitData, branchId]);

  const filteredItemData = unitTableData.map((data) =>
    unitItemData?.filter((item) => item.unitId === data.id),
  );

  useEffect(() => {
    const flattenedData = filteredItemData
      ?.filter((item) => item !== undefined)
      .flat();
    setUnitItemTableData(flattenedData as UnitItem[]);
  }, [unitTableData]);

  const filteredUnitEndDates = filteredItemData.map((items) =>
    items
      ?.map((item) => item.endDate)
      .filter((date) => {
        if (date) {
          const endDate = new Date(date);
          return currentDate.getTime() < endDate.getTime();
        }
        return false;
      }),
  );

  useEffect(() => {
    const updatedUnitTableData = unitTableData.map((tableData, idx) => ({
      ...tableData,
      numberOfItemInUse: filteredUnitEndDates[idx]?.length,
    }));
    setFilteredUnitTableData(updatedUnitTableData);
  }, [unitTableData]);

  for (let i = 0; i < branchData?.length; i++) {
    options.push({
      value: branchData[i].id,
      label: branchData[i].branchName,
    });
  }

  const handleBranchIdChange = (value: string | string[]) =>
    router.push(`/unit?branchId=${value}`);

  if (hasError) {
    return <Error statusCode={500} />;
  }

  return (
    <PageLayout>
      <ContentTitle title="유닛" />
      <BranchIdSelect
        options={options}
        handleBranchIdChange={handleBranchIdChange}
      />
      <TableStatistics dataSource={unitItemTableData} />
      <TableData dataSource={filteredUnitTableData} buttonTitle="+ 유닛 추가" />
      <UnitItemTableData
        dataSource={unitItemTableData}
        buttonTitle="+ 유닛아이템 추가"
      />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const unitData = await getUnitData();
  const unitItemData = await getUnitItemData();
  const branchData = await getBranchData();
  try {
    return {
      props: {
        unitData,
        unitItemData,
        branchData,
      },
    };
  } catch (error) {
    return {
      props: { hasError: true },
    };
  }
};

export default Unit;
