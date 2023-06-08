import { Unit, UnitItem } from 'types/Unit';

export const getUnitData = (): Promise<Unit[]> => {
  return new Promise((res) => {
    import(`pages/api/unit.json`).then((data) => {
      console.log('unit data', data);
      res(data.default);
    });
  });
};

export const getUnitItemData = (): Promise<UnitItem[]> => {
  return new Promise((res) => {
    import(`pages/api/unit-item.json`).then((data) => {
      console.log('unit item data', data);
      res(data.default);
    });
  });
};
