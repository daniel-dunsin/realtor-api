import './globals.css';
import { IDefaultProps } from './lib/interfaces/store.interface';
import { ReduxProvider } from './lib/redux/provider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Realtor',
  description: 'Real Estate Website',
};

export default function RootLayout({ children }: IDefaultProps) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <Toaster />
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
