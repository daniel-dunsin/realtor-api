import React from 'react';
import SingleArticle from '../../ui/SingleArticle/SingleArticle';
import Title from '../../ui/Title/Title';

const Articles = () => {
  return (
    <section className='container'>
      <div>
        <Title align='center' title='Articles & Tips' />

        <div className='scroll-container'>
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
          <SingleArticle />
        </div>
      </div>
    </section>
  );
};

export default Articles;
