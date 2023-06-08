import { createContext } from 'react';

import { Branch } from 'types/Branch';

const DataContext = createContext<Branch[] | undefined>([]);

export default DataContext;
