import React from 'react';
import './Home.scss';
import './utility.scss';
import PopUp from '../components/PopUp';
import UrlExplorer from '../components/UrlExplorer';
import Header from '../components/Header';

function Home() {
  return (
    <div className='home-bg'>
      <div className='container'>
        <Header />
        <PopUp />
        <UrlExplorer />
      </div>
    </div>
  );
}

export default Home;
