import './globals.css';
import { ReduxProvider } from './lib/redux/provider';

export const metadata = {
  title: 'Realtor',
  description: 'Real Estate Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
