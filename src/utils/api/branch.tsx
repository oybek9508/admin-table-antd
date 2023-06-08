import Branch from "types/Branch";

export const getBranchData = (): Promise<Branch[]> => { // add the type later
    return new Promise((res) => {
        import(`pages/api/branch.json`).then((data) => {
            console.log('branch data', data)
          res(data.default);
        });
      });
}