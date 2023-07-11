import Articles from './lib/components/home/Articles/Articles';
import Banner from './lib/components/home/Banner/Banner';
import FeaturedProperties from './lib/components/home/FeaturedProperties/FeaturedProperties';
import FindProperties from './lib/components/home/FindProperties/FindProperties';
import Footer from './lib/components/ui/Footer/Footer';

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedProperties />
      <FindProperties />
      <Articles />
      <Footer />
    </>
  );
}
