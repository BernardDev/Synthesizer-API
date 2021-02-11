import React from 'react';
import './Home.scss';
import './utility.scss';
import PopUp from '../components/PopUp';
import UrlExplorer from '../components/UrlExplorer';
import Header from '../components/Header';

function Home() {
  return (
    <div className='home-bg'>
      <div className='header-bg'>
        <div className='wrapper'>
          <Header />
        </div>
      </div>
      <div className='popup-bg p-4'>
        <div className='wrapper'>
          <PopUp />
        </div>
      </div>
      <div className='UrlExplorer-bg'>
        <div className='wrapper'>
          <UrlExplorer />
        </div>
      </div>
    </div>
  );
}

export default Home;
