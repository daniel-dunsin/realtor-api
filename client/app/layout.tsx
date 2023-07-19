import './globals.css';
import { IDefaultProps } from './lib/interfaces/store.interface';
import { ReduxProvider } from './lib/redux/provider';
import { Toaster } from 'react-hot-toast';
import AppContainer from './lib/layout';

export const metadata = {
  title: 'Realtor',
  description: 'Real Estate Website',
};

export default function RootLayout({ children }: IDefaultProps) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <AppContainer>
          <Toaster
            position='top-center'
            toastOptions={{ style: { minWidth: '250px' } }}
          />
          <body>{children}</body>
        </AppContainer>
      </ReduxProvider>
    </html>
  );
}
