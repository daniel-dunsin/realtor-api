import Image from 'next/image';
import Banner from './components/home/Banner/Banner';
import FeaturedProperties from './components/home/FeaturedProperties/FeaturedProperties';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedProperties />
    </>
  );
}
