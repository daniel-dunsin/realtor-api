import Image from 'next/image';
import Articles from './components/home/Articles/Articles';
import Banner from './components/home/Banner/Banner';
import FeaturedProperties from './components/home/FeaturedProperties/FeaturedProperties';
import FindProperties from './components/home/FindProperties/FindProperties';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedProperties />
      <FindProperties />
      <Articles />
    </>
  );
}
