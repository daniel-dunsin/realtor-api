import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { ReduxProvider } from './redux/provider';
const poppins = Inter({
  weight: ['400', '200', '600'],
  subsets: ['latin'],
});

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
        <body className={poppins.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
