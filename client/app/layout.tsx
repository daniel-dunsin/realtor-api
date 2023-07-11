import './globals.css';
import { IDefaultProps } from './lib/interfaces/store.interface';
import { ReduxProvider } from './lib/redux/provider';

export const metadata = {
  title: 'Realtor',
  description: 'Real Estate Website',
};

export default function RootLayout({ children }: IDefaultProps) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
