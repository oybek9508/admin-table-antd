import DataContext from 'contexts/DataContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataContext.Provider value={pageProps}>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}
